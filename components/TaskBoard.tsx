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
  console.log(mainData)

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
      a title and a button to add a new column 
      and render the page acurretivly to mainData*/}
      {mainData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          return (
            <div key={board.name}>
              <h3>{board.name}</h3>
              {board.columns.map((column: any) => (
                <div key={column}>
                  <h3>{column.columsNameAre}</h3>
                </div>
              ))}
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskBoard
