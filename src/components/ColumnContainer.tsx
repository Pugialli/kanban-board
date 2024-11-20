import { useSortable } from "@dnd-kit/sortable"
import { CSS } from '@dnd-kit/utilities'
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"
import type { Column, Id, Task } from "../types"
import { TaskCard } from "./TaskCard"

export interface ColumnContainerProps {
  column: Column
  deleteColumn: (id: Id) => void
  updateColumn: (id: Id, title: string) => void
  createTask: (columnId: Id) => void
  tasks: Task[]
}

export function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks }: ColumnContainerProps) {
  const [editMode, setEditMode] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column
    },
    disabled: editMode,
  })

  const style = { transition, transform: CSS.Transform.toString(transform) }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md opacity-60 border-2 border-rose-500" />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col">
      {/* Column Title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-4 border-columnBackgroundColor flex items-center justify-between">
        <div className="flex gap-2">
          <div className="flex justify-center items-center bg-columnBackgroundColor px-2 py-1  text-sm rounded-full">0</div>
          {editMode ? (
            <input
              className="bg-black focus:border-rose-500 border rounded outline-none px-2 "
              value={column.title}
              onChange={e => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => setEditMode(false)}
              onKeyDown={e => {
                if (e.key !== 'Enter') return
                setEditMode(false)
              }}
            />
          ) : (column.title)}
        </div>
        <button onClick={() => deleteColumn(column.id)} className="text-gray-500 hover:text-white hover:bg-columnBackgroundColor rounded px-1 py-2">
          <Trash2 className="size-4" />
        </button>
      </div>
      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks.map(task => {
          return (
            <TaskCard key={task.id} task={task} />
          )
        })}
      </div>
      {/* Column footer */}
      <button
        onClick={() => { createTask(column.id) }}
        className="flex gap-2 items-center border-columnBackgroundColor border-x-columnBackgroundColor border-2 cursor-pointer rounded-md p-4 hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black">
        <PlusCircle className="size-4" />
        Add Task
      </button>
    </div>
  )
}