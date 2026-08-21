import { mutation, query } from './_generated/server'
import type { MutationCtx, QueryCtx } from './_generated/server'
import type { Id } from './_generated/dataModel'
import { v } from 'convex/values'

const MAX_PLAYERS = 40
const HOST_PASSWORD = 'Admin@123'
const TOP_FINISH_COUNT = 3

const levelValidator = v.union(v.literal(1), v.literal(2), v.literal(3))

function generateCode() {
  return String(Math.floor(10000 + Math.random() * 90000))
}

async function listPlayers(ctx: QueryCtx | MutationCtx, roomId: Id<'rooms'>) {
  return await ctx.db
    .query('players')
    .withIndex('by_roomId', (q) => q.eq('roomId', roomId))
    .take(MAX_PLAYERS)
}

async function deleteRoomAndPlayers(ctx: MutationCtx, roomId: Id<'rooms'>) {
  const players = await listPlayers(ctx, roomId)
  for (const p of players) await ctx.db.delete(p._id)
  await ctx.db.delete(roomId)
}

/** How many finishers close the race (top 3, or everyone if fewer than 3 players). */
function raceCloseThreshold(contestantCount: number) {
  return Math.min(TOP_FINISH_COUNT, Math.max(1, contestantCount))
}

export const create = mutation({
  args: {
    hostName: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const hostName = args.hostName.trim()
    if (!hostName) throw new Error('Vui lòng nhập tên chủ phòng.')
    if (args.password !== HOST_PASSWORD) {
      throw new Error('Mật khẩu chủ phòng không chính xác!')
    }

    let code = generateCode()
    for (let attempt = 0; attempt < 12; attempt += 1) {
      const existing = await ctx.db
        .query('rooms')
        .withIndex('by_code', (q) => q.eq('code', code))
        .unique()
      if (!existing) break
      code = generateCode()
    }

    const roomId = await ctx.db.insert('rooms', {
      code,
      status: 'lobby',
    })

    const playerId = await ctx.db.insert('players', {
      roomId,
      name: hostName,
      isHost: true,
      completedLevel: 0,
    })

    return { roomId, playerId, code }
  },
})

export const join = mutation({
  args: {
    code: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const code = args.code.trim()
    const name = args.name.trim()
    if (!code || !name) throw new Error('Vui lòng nhập đủ mã phòng và tên.')

    const room = await ctx.db
      .query('rooms')
      .withIndex('by_code', (q) => q.eq('code', code))
      .unique()

    if (!room) throw new Error('Không tìm thấy phòng với mã này!')
    if (room.status !== 'lobby') {
      throw new Error('Trò chơi đã bắt đầu, không thể tham gia!')
    }

    const players = await listPlayers(ctx, room._id)

    if (players.length >= MAX_PLAYERS) {
      throw new Error(`Phòng đã đủ ${MAX_PLAYERS} người chơi.`)
    }

    const nameTaken = players.some((p) => p.name.toLowerCase() === name.toLowerCase())
    if (nameTaken) throw new Error('Tên người chơi đã tồn tại trong phòng.')

    const playerId = await ctx.db.insert('players', {
      roomId: room._id,
      name,
      isHost: false,
      completedLevel: 0,
    })

    return { roomId: room._id, playerId, code: room.code }
  },
})

export const get = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, args) => ctx.db.get(args.roomId),
})

export const getByCode = query({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('rooms')
      .withIndex('by_code', (q) => q.eq('code', args.code.trim()))
      .unique()
  },
})

export const getPlayers = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, args) => listPlayers(ctx, args.roomId),
})

export const getPlayer = query({
  args: { playerId: v.id('players') },
  handler: async (ctx, args) => ctx.db.get(args.playerId),
})

/** Live standings for the host monitor / honor board */
export const getLeaderboard = query({
  args: { roomId: v.id('rooms') },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId)
    if (!room) return null

    const players = await listPlayers(ctx, args.roomId)
    const contestants = players.filter((p) => !p.isHost)

    const ranked = [...contestants].sort((a, b) => {
      const aDone = a.finishedAt != null
      const bDone = b.finishedAt != null
      if (aDone && bDone) return (a.finishedAt as number) - (b.finishedAt as number)
      if (aDone !== bDone) return aDone ? -1 : 1
      if (b.completedLevel !== a.completedLevel) return b.completedLevel - a.completedLevel
      return a.name.localeCompare(b.name, 'vi')
    })

    const finishers = ranked.filter((p) => p.finishedAt != null)
    const top3 = finishers.slice(0, TOP_FINISH_COUNT).map((p, index) => ({
      id: p._id,
      name: p.name,
      finishedAt: p.finishedAt as number,
      rank: index + 1,
      elapsedMs: room.startedAt ? (p.finishedAt as number) - room.startedAt : null,
    }))

    return {
      room: {
        id: room._id,
        code: room.code,
        status: room.status,
        startedAt: room.startedAt ?? null,
      },
      top3,
      raceClosed: room.status === 'results',
      closeAt: raceCloseThreshold(contestants.length),
      entries: ranked.map((p, index) => ({
        id: p._id,
        name: p.name,
        completedLevel: p.completedLevel,
        finishedAt: p.finishedAt ?? null,
        elapsedMs:
          p.finishedAt != null && room.startedAt != null
            ? (p.finishedAt as number) - room.startedAt
            : null,
        place: index + 1,
        isTop3: finishers.some((f, i) => i < TOP_FINISH_COUNT && f._id === p._id),
      })),
    }
  },
})

export const leave = mutation({
  args: { playerId: v.id('players') },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId)
    if (!player) return

    const room = await ctx.db.get(player.roomId)

    if (player.isHost) {
      if (room?.status === 'lobby') {
        await deleteRoomAndPlayers(ctx, player.roomId)
        return
      }
      await ctx.db.delete(player._id)
      return
    }

    await ctx.db.delete(player._id)
  },
})

/** Host ends the whole session — everyone returns to the lobby. */
export const endSession = mutation({
  args: {
    roomId: v.id('rooms'),
    playerId: v.id('players'),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId)
    if (!room) return

    const player = await ctx.db.get(args.playerId)
    if (!player || player.roomId !== args.roomId || !player.isHost) {
      throw new Error('Chỉ chủ phòng mới kết thúc phiên được.')
    }

    await deleteRoomAndPlayers(ctx, args.roomId)
  },
})

export const start = mutation({
  args: {
    roomId: v.id('rooms'),
    playerId: v.id('players'),
  },
  handler: async (ctx, args) => {
    const room = await ctx.db.get(args.roomId)
    if (!room) throw new Error('Phòng không tồn tại.')

    const player = await ctx.db.get(args.playerId)
    if (!player || player.roomId !== args.roomId || !player.isHost) {
      throw new Error('Chỉ chủ phòng mới bắt đầu được.')
    }
    if (room.status !== 'lobby') throw new Error('Phòng đã bắt đầu.')

    const players = await listPlayers(ctx, args.roomId)
    const contestants = players.filter((p) => !p.isHost)
    if (contestants.length < 1) {
      throw new Error('Cần ít nhất 1 người chơi (không tính chủ phòng).')
    }

    for (const p of players) {
      await ctx.db.replace(p._id, {
        roomId: p.roomId,
        name: p.name,
        isHost: p.isHost,
        completedLevel: 0,
      })
    }

    await ctx.db.patch(args.roomId, {
      status: 'playing',
      startedAt: Date.now(),
    })
  },
})

/**
 * Self-paced level complete. Completing level 3 records finish time and may close the race.
 */
export const markLevelComplete = mutation({
  args: {
    playerId: v.id('players'),
    level: levelValidator,
  },
  handler: async (ctx, args) => {
    const player = await ctx.db.get(args.playerId)
    if (!player) throw new Error('Người chơi không tồn tại.')
    if (player.isHost) throw new Error('Chủ phòng không tham gia chơi.')

    const room = await ctx.db.get(player.roomId)
    if (!room || (room.status !== 'playing' && room.status !== 'results')) {
      throw new Error('Phòng không ở trạng thái chơi.')
    }

    if (room.status === 'results' && player.completedLevel < 3) {
      throw new Error('Cuộc đua đã kết thúc (đã có Top 3).')
    }

    if (player.completedLevel < args.level - 1) {
      throw new Error('Bạn cần hoàn thành màn trước đó trước.')
    }

    if (player.completedLevel >= args.level) {
      return { finished: player.finishedAt != null, raceClosed: room.status === 'results' }
    }

    if (args.level === 3) {
      const finishedAt = Date.now()
      await ctx.db.patch(player._id, {
        completedLevel: 3,
        finishedAt,
      })

      const players = await listPlayers(ctx, player.roomId)
      const contestants = players.filter((p) => !p.isHost)
      const finishers = contestants.filter((p) => p.finishedAt != null)
      const threshold = raceCloseThreshold(contestants.length)
      let raceClosed = room.status === 'results'

      if (room.status === 'playing' && finishers.length >= threshold) {
        await ctx.db.patch(player.roomId, { status: 'results' })
        raceClosed = true
      }

      return { finished: true, raceClosed }
    }

    await ctx.db.patch(player._id, { completedLevel: args.level })
    return { finished: false, raceClosed: room.status === 'results' }
  },
})

/** Dev helper: wipe every room + player (reset after schema changes). */
export const clearAll = mutation({
  args: {},
  handler: async (ctx) => {
    const rooms = await ctx.db.query('rooms').take(200)
    let deletedPlayers = 0
    for (const room of rooms) {
      const players = await listPlayers(ctx, room._id)
      for (const p of players) {
        await ctx.db.delete(p._id)
        deletedPlayers += 1
      }
      await ctx.db.delete(room._id)
    }

    // Orphan players (room already gone)
    const leftovers = await ctx.db.query('players').take(200)
    for (const p of leftovers) {
      await ctx.db.delete(p._id)
      deletedPlayers += 1
    }

    return { deletedRooms: rooms.length, deletedPlayers }
  },
})
