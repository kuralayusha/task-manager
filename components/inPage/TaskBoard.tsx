import { useEffect } from 'react'
import { useState } from 'react'
import Image from 'next/image'

type TaskBoardProps = {
  tasksData: any
  taskBoardFocus: any
  wantedNewTask: any
  setShowTaskDetails: any
  setIsSideBarHidden: any
  isSideBarHidden: boolean
  mainData: any
  setMainData: any
  setTaskDetailFocus: any
  setWantedEditBoard: any
  wantedEditBoard: any
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
  setTaskDetailFocus,
  setWantedEditBoard,
  wantedEditBoard,
}: TaskBoardProps) {
  const [a, render] = useState(false)
  function handleTaskDetailShow(e: any) {
    setTaskDetailFocus(e)
    setShowTaskDetails(true)
    console.log(e)
  }

  useEffect(() => {
    render(!a)
  }, [mainData])
  // console.log(mainData)

  function handleNewColumn() {
    setWantedEditBoard(true)
  }
  return (
    <div className="task-board">
      <button
        className="big-screen--sidebar--button"
        style={
          isSideBarHidden
            ? { background: 'fff' }
            : { display: 'none' }
        }
        onClick={() => {
          setIsSideBarHidden(false)
        }}
      >
        <Image
          src={'/assets/icon-show-sidebar.svg'}
          width={16}
          height={10.22}
          alt="show side bar"
        />
      </button>
      {/* TODO: if there is no column show 
      a title and a button to add a new column 
      and render the page acurretivly to mainData*/}
      {mainData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          return (
            <div className="task-board--container" key={board.name}>
              {board.columns.map((column: any) => (
                <div className="column" key={column.columsNameAre}>
                  <h3 className="column--name">
                    {column.columsNameAre} ({column.tasks.length})
                  </h3>
                  {column.tasks.map((task: any) => (
                    <button
                      className="tasks"
                      id={task.title}
                      key={task.title}
                      onClick={(e) =>
                        handleTaskDetailShow(task.title)
                      }
                    >
                      <h3>{task.title}</h3>
                      {/* for each task calculate the subtask length and find wich of them are isComplited true then print it */}
                      {task.subtasks.length >= 1 && (
                        <p>
                          {' '}
                          {
                            task.subtasks.filter(
                              (subtask: any) =>
                                subtask.isCompleted === true
                            ).length
                          }{' '}
                          of {task.subtasks.length} substasks
                        </p>
                      )}
                      {/* now calculate each subtasks that are isCompleted true */}
                    </button>
                  ))}
                </div>
              ))}
              <button
                className="create--column--button"
                onClick={() => {
                  handleNewColumn()
                }}
              >
                <p>+ New Column</p>
              </button>
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskBoard
