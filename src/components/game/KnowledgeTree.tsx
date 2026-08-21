import { Icon } from '../common/Icon'
import { level1KnowledgeBranches } from '../../data/level1KnowledgeNodes'

type KnowledgeTreeProps = {
  unlockedBranches: Set<string>
  unlockedNodes: Set<string>
  activeBranch: string | null
  complete: boolean
}

const branchLines: Record<string, { x2: number; y2: number }> = {
  organization: { x2: 185, y2: 115 },
  society: { x2: 500, y2: 82 },
  opponents: { x2: 815, y2: 115 },
  missions: { x2: 185, y2: 505 },
  forces: { x2: 500, y2: 538 },
  direction: { x2: 815, y2: 505 },
}

export function KnowledgeTree({ unlockedBranches, unlockedNodes, activeBranch, complete }: KnowledgeTreeProps) {
  return (
    <div className={`knowledge-tree ${complete ? 'is-complete' : ''}`}>
      <div className="knowledge-tree__meta">
        <span>Hồ sơ đường lối / 1951</span>
        <span>{unlockedBranches.size} / 6 nhánh</span>
      </div>
      <div className="knowledge-tree__canvas">
        <svg aria-hidden="true" className="knowledge-tree__lines" viewBox="0 0 1000 620">
          {level1KnowledgeBranches.map((branch) => (
            <line
              className={unlockedBranches.has(branch.id) ? 'is-unlocked' : ''}
              key={branch.id}
              x1="500"
              x2={branchLines[branch.id].x2}
              y1="310"
              y2={branchLines[branch.id].y2}
            />
          ))}
        </svg>

        <div className="knowledge-tree__center">
          <span>Đại hội II</span>
          <strong>1951</strong>
        </div>

        {level1KnowledgeBranches.map((branch) => {
          const unlocked = unlockedBranches.has(branch.id)
          return (
            <section
              aria-label={`${branch.label}: ${unlocked ? 'đã mở khóa' : 'chưa mở khóa'}`}
              className={`knowledge-branch knowledge-branch--${branch.id} ${unlocked ? 'is-unlocked' : ''} ${activeBranch === branch.id ? 'is-active' : ''}`}
              key={branch.id}
            >
              <header><Icon name={unlocked ? 'lock_open' : 'lock'} /><strong>{branch.label}</strong></header>
              <ul>
                {branch.nodes.map((node) => (
                  <li className={unlockedNodes.has(node.id) ? 'is-unlocked' : ''} key={node.id}>
                    {unlockedNodes.has(node.id) ? node.label : <span aria-label="Nội dung chưa mở khóa">••••••</span>}
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </div>
      {complete && <div className="knowledge-tree__complete"><Icon name="verified" filled /><span>Đường lối 1951</span><strong>Đã được giải mã</strong></div>}
    </div>
  )
}
