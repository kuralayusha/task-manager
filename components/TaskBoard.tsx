import { useEffect } from 'react'
import { useState } from 'react'

type TaskBoardProps = {
  tasksData: any
  taskBoardFocus: any
}

function TaskBoard({ tasksData, taskBoardFocus }: TaskBoardProps) {
  return (
    <div className="task-board">
      {/* TODO: if there is no column show 
      a title and a button to add a new column */}
      {/* TODO: if there is a column map them and print evry column and 
      in every column print the tasks */}
      {tasksData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          return board.columns.map((column: any) => (
            <div key={column.name}>
              <h3>{column.name}</h3>
              {column.tasks.map((task: any) => (
                <div key={task.title}>
                  <h4>{task.title}</h4>
                  {/* todo: check the subtasks length, 
                  isCompleted and 
                  print it like "1 of 3 substask is done"  */}
                  <p>{/* something */}</p>
                </div>
              ))}
            </div>
          ))
        }
      })}
    </div>
  )
}

export default TaskBoard
