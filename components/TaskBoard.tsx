import { useEffect } from 'react'
import { useState } from 'react'

type TaskBoardProps = {
  tasksData: any
  taskBoardFocus: any
  wantedNewTask: any
  setShowTaskDetails: any
}

function TaskBoard({
  tasksData,
  taskBoardFocus,
  wantedNewTask,
  setShowTaskDetails,
}: TaskBoardProps) {
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
                <button
                  onClick={() => {
                    setShowTaskDetails(true)
                  }}
                  key={task.title}
                >
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
