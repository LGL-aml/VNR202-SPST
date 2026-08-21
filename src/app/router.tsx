import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from '../components/layout/AppShell'
import { CompletedPage } from '../pages/CompletedPage'
import { FinalCinematicPage } from '../pages/FinalCinematicPage'
import { GameSelectPage } from '../pages/GameSelectPage'
import { HomePage } from '../pages/HomePage'
import { LeaderboardPage } from '../pages/LeaderboardPage'
import { Level1Page } from '../pages/Level1Page'
import { Level2Page } from '../pages/Level2Page'
import { Level3Page } from '../pages/Level3Page'
import { TheoryDetailPage } from '../pages/TheoryDetailPage'
import { TheoryPage } from '../pages/TheoryPage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route element={<HomePage />} index />
        <Route element={<TheoryPage />} path="theory" />
        <Route element={<TheoryDetailPage />} path="theory/:chapter" />
        <Route element={<GameSelectPage />} path="game" />
        <Route element={<LeaderboardPage />} path="game/leaderboard" />
        <Route element={<Level1Page />} path="game/level-1" />
        <Route element={<Level2Page />} path="game/level-2" />
        <Route element={<Level3Page />} path="game/level-3" />
        <Route element={<FinalCinematicPage />} path="final" />
        <Route element={<CompletedPage />} path="completed" />
        <Route element={<Navigate replace to="/" />} path="*" />
      </Route>
    </Routes>
  )
}

