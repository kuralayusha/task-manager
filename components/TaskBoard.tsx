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
  setTaskDetailFocus: any
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
                <div key={column.columsNameAre}>
                  <h3>{column.columsNameAre}</h3>
                  {column.tasks.map((task: any) => (
                    <button
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
            </div>
          )
        }
      })}
    </div>
  )
}

export default TaskBoard
