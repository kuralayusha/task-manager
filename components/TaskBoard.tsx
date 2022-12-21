import { useEffect } from 'react'
import { useState } from 'react'

type TaskBoardProps = {
  tasksData: any
  taskBoardFocus: any
  wantedNewTask: any
  setShowTaskDetails: any
  setIsSideBarHidden: any
  isSideBarHidden: boolean
  mainData: any
  setMainData: any
}

function TaskBoard({
  tasksData,
  taskBoardFocus,
  wantedNewTask,
  setShowTaskDetails,
  setIsSideBarHidden,
  isSideBarHidden,
  mainData,
  setMainData,
}: TaskBoardProps) {
  console.log(mainData.boards)

  return (
    <div className="task-board">
      <button
        style={
          isSideBarHidden
            ? { background: 'fff' }
            : { display: 'none' }
        }
        onClick={() => {
          setIsSideBarHidden(false)
        }}
      >
        sidebar
      </button>
      {/* TODO: if there is no column show 
      a title and a button to add a new column */}
      {mainData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          return (
            <div key={board.name}>
              <h3>{board.name}</h3>
              <div className="columns">
                {board.columns.map((column: any) => {
                  return (
                    <div key={column.name}>
                      <h4>{column.name}</h4>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskBoard
