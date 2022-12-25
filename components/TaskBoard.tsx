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
  // setTimeout(() => {
  //   console.log(
  //     mainData.boards[0].columns[1].tasks[1].subtasks.length
  //   )
  // }, 5000)

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
                  {column.tasks.map((task: any) => (
                    <button
                      key={task.title}
                      onClick={() => {
                        setShowTaskDetails(task)
                      }}
                    >
                      <h3>{task.title}</h3>
                      {/* for each task calculate the subtask length and find wich of them are isComplited true then print it */}
                      <p>{task.subtasks.length} subtasks</p>
                      {/* now calculate each subtasks that are isCompleted true */}
                      <p>
                        {
                          task.subtasks.filter(
                            (subtask: any) =>
                              subtask.isCompleted === true
                          ).length
                        }{' '}
                        subtasks are done
                      </p>
                    </button>
                  ))}
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
