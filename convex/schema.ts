import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

/**
 * Race-mode multiplayer: players progress independently through 3 levels.
 * Top 3 fastest finishers are honored; host monitors on the leaderboard.
 */
export default defineSchema({
  rooms: defineTable({
    code: v.string(),
    status: v.union(v.literal('lobby'), v.literal('playing'), v.literal('results')),
    /** Wall-clock start for elapsed-time ranking */
    startedAt: v.optional(v.number()),
    /** @deprecated Legacy synced-level field — optional so old docs still validate */
    currentLevel: v.optional(v.union(v.literal(1), v.literal(2), v.literal(3))),
  }).index('by_code', ['code']),

  players: defineTable({
    roomId: v.id('rooms'),
    name: v.string(),
    isHost: v.boolean(),
    /** Highest completed level: 0 none, 1–3 done */
    completedLevel: v.union(v.literal(0), v.literal(1), v.literal(2), v.literal(3)),
    /** Set when all 3 levels are complete — used for top-3 race ranking */
    finishedAt: v.optional(v.number()),
  })
    .index('by_roomId', ['roomId'])
    .index('by_roomId_name', ['roomId', 'name']),
})
