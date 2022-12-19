import { useEffect } from 'react'
import { useState } from 'react'

type TaskBoardProps = {
  tasksData: any
  taskBoardFocus: any
}

function TaskBoard({ tasksData, taskBoardFocus }: TaskBoardProps) {
  const [subtasksCompleted, setSubtasksCompleted] = useState<any>({})
  const [subtasksLength, setSubtasksLength] = useState<any>({})

  console.log(subtasksCompleted, subtasksLength)
  return (
    <div className="task-board">
      {/* TODO: if there is no column show 
      a title and a button to add a new column */}
      {tasksData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          return board.columns.map((column: any) => (
            <div key={column.name}>
              <h3>{column.name}</h3>
              {column.tasks.map((task: any) => (
                <button key={task.title}>
                  <h4>{task.title}</h4>
                  <p>
                    {
                      task.subtasks.filter(
                        (subtask: any) => subtask.isCompleted === true
                      ).length
                    }
                    of {task.subtasks.length} subtasks
                  </p>
                </button>
              ))}
            </div>
          ))
        }
      })}
    </div>
  )
}

export default TaskBoard
