import './App.css'

import { KanbanBoard } from './components/KanbanBoard'

function App() {
  return (
    <div className="w-full px-[40px] py-8 min-h-screen">
      <h1 className="text-xl font-bold">Pugialli Kanban</h1>
      <KanbanBoard />
    </div>
  )
}

export default App
