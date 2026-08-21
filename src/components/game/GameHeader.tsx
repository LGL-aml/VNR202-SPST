type GameHeaderProps = {
  level: string
  concept: string
  title: string
  subtitle: string
  progress: string
}

export function GameHeader({ level, concept, title, subtitle, progress }: GameHeaderProps) {
  return (
    <header className="game-page__header game-page__header--split">
      <div>
        <p className="page-kicker">{level} / {concept}</p>
        <h1 className="page-heading">{title}</h1>
        <p className="page-lead">{subtitle}</p>
      </div>
      <span className="stamp">{progress}</span>
    </header>
  )
}
