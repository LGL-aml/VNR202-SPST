export type Answer = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  question: string
  answers: Answer[]
  correctAnswer: string
  explanation?: string
}

export type KnowledgeQuestion = QuizQuestion & {
  topic: string
  unlockBranch: string
  unlockBranches?: string[]
  unlockNodes: string[]
}

export type KnowledgeNode = {
  id: string
  label: string
}

export type KnowledgeBranch = {
  id: string
  label: string
  nodes: KnowledgeNode[]
}

export type SortCard = {
  id: string
  label: string
  content: string
  categoryId: string
}

export type SortCategory = {
  id: string
  label: string
  progression: string
}

export type PuzzleRegion = {
  id: string
  code: string
  points: string
  fill: string
  labelX: number
  labelY: number
}
