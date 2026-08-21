import { level3PuzzleRegions } from '../../data/level3PuzzleRegions'

type CodedPuzzleProps = {
  revealedCodes: Set<string>
  complete: boolean
}

export function CodedPuzzle({ revealedCodes, complete }: CodedPuzzleProps) {
  const flagVisible = complete || revealedCodes.has('1A')
  const starVisible = complete || revealedCodes.has('2C')
  const bunkerVisible = complete || revealedCodes.has('3B')

  return (
    <div className={`coded-puzzle ${complete ? 'is-complete' : ''}`}>
      <div className="coded-puzzle__meta"><span>Ảnh mã hóa: DBP–07.05.1954</span><span>{level3PuzzleRegions.length} vùng</span></div>
      <svg aria-label={`Bức tranh Điện Biên Phủ gồm ${level3PuzzleRegions.length} vùng đa giác`} role="img" viewBox="0 0 500 600">
        <title>Lá cờ chiến thắng trên hầm chỉ huy Điện Biên Phủ</title>
        <rect fill="#F6E7BF" height="600" width="500" />
        <g className="puzzle-contours" fill="none" stroke="#8F7754" strokeOpacity=".2">
          <path d="M0 88Q120 34 250 92T500 74M0 226Q130 170 260 222T500 206M0 488Q140 412 280 472T500 446" />
        </g>
        {level3PuzzleRegions.map((region) => {
          const revealed = complete || revealedCodes.has(region.code)
          return (
            <g key={region.id}>
              <polygon className={revealed ? 'is-revealed' : ''} fill={revealed ? region.fill : 'var(--color-sepia)'} points={region.points} />
              {!revealed && <text className="puzzle-code" x={region.labelX} y={region.labelY}>{region.code}</text>}
            </g>
          )
        })}
        <g className={`puzzle-illustration ${flagVisible ? 'is-visible' : ''}`}>
          <path className="puzzle-flagpole" d="M147 83V354" />
          <path className="puzzle-flag" d="M149 94C213 65 291 78 378 104L365 208C286 180 219 171 149 200Z" />
        </g>
        <polygon
          className={`puzzle-star ${starVisible ? 'is-visible' : ''}`}
          points="258,105 270,132 300,135 277,155 284,185 258,169 232,185 239,155 216,135 246,132"
        />
        <g className={`puzzle-bunker ${bunkerVisible ? 'is-visible' : ''}`}>
          <path className="puzzle-bunker__earth" d="M78 367L116 298Q249 266 386 305L425 367Z" />
          <path className="puzzle-bunker__roof" d="M97 355Q247 316 405 354L392 385H108Z" />
          <path className="puzzle-bunker__front" d="M119 378H381L405 481H93Z" />
          <path className="puzzle-bunker__door" d="M218 402H286V481H218Z" />
          <path className="puzzle-bunker__opening" d="M137 407H194V435H137ZM310 407H365V435H310Z" />
          <path className="puzzle-bunker__detail" d="M106 454H217M286 454H394M124 386H377" />
        </g>
        <g className={`puzzle-final-art ${complete ? 'is-visible' : ''}`}>
          <path className="puzzle-ground puzzle-ground--back" d="M0 450Q91 414 183 444T353 439T500 421V600H0Z" />
          <path className="puzzle-ground puzzle-ground--front" d="M0 505Q95 464 194 497T371 493T500 468V600H0Z" />
          <path className="puzzle-trench" d="M20 520Q121 475 210 508T365 510T480 484" />
          <text className="puzzle-landmark" x="250" y="334">HẦM CHỈ HUY ĐIỆN BIÊN PHỦ</text>
          <text className="puzzle-victory" x="250" y="548">CHIẾN THẮNG ĐIỆN BIÊN PHỦ</text>
          <text className="puzzle-date" x="250" y="575">07.05.1954</text>
        </g>
      </svg>
      <p>Mỗi mã đáp án đúng mở sáu mảnh của bức tranh. Trả lời đúng cả 5 câu để hiện đủ hình hầm Điện Biên Phủ.</p>
    </div>
  )
}
