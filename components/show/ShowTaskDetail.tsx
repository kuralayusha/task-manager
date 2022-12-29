import { useEffect, useState } from 'react'

type ShowTaskDetailProps = {
  setShowTaskDetails: any
  setWantedEditTask: any
  taskDetailFocus: any
  mainData: any
  setMainData: any
}

function ShowTaskDetail({
  setShowTaskDetails,
  setWantedEditTask,
  taskDetailFocus,
  mainData,
  setMainData,
}: ShowTaskDetailProps) {
  const [a, render] = useState<boolean>(true)
  // this page is for showing the details of a task
  // first we need to render the task title
  // then we need to render the task description
  // then we need to render the tasks subtasks in a checklist
  // then we need to render the current task status

  // when user toggles on the checkbox we need to update the subtask isCompleted value and change the task status
  // useEffect(() => {
  //   const data = localStorage.getItem('mainData')
  //   if (data) {
  //     setMainData(JSON.parse(data))
  //   }
  // }, [])

  function handleCheckboxClick(e: any) {
    const newData = mainData?.boards?.map((board: any) => {
      return board.columns.map((column: any) => {
        return column.tasks.map((task: any) => {
          if (task.title === taskDetailFocus) {
            return task.subtasks.map((subtask: any) => {
              if (subtask.subtasksName === e.target.id) {
                subtask.isCompleted = !subtask.isCompleted
              }
              return subtask
            })
          }
          return task
        })
      })
    })
    render(!a)
    console.log(e.target.id)
  }

  function handleSaveChanges() {
    localStorage.setItem('mainData', JSON.stringify(mainData))
    setShowTaskDetails(false)
  }

  function handleSettings() {
    setWantedEditTask(taskDetailFocus)
    setShowTaskDetails(false)
  }
  return (
    <div>
      <button
        onClick={() => {
          handleSettings()
        }}
      >
        ...
      </button>

      <h1>{taskDetailFocus}</h1>
      {mainData?.boards?.map((board: any) => {
        return board.columns.map((column: any) => {
          return column.tasks.map((task: any) => {
            if (task.title === taskDetailFocus) {
              return (
                <div key={task.title}>
                  <h3>{task.description}</h3>
                  {task.subtasks.length >= 1 && (
                    <p>
                      {' '}
                      (
                      {
                        task.subtasks.filter(
                          (subtask: any) =>
                            subtask.isCompleted === true
                        ).length
                      }{' '}
                      of {task.subtasks.length})
                    </p>
                  )}
                  {/* we need to render the tasks subtasks in a checklist then we need to render the current task status */}

                  {task.subtasks.length >= 1 && (
                    <ul>
                      {task.subtasks.map((subtask: any) => {
                        return (
                          <li key={subtask.title}>
                            <input
                              type="checkbox"
                              checked={subtask.isCompleted}
                              // className={
                              //   subtask.isCompleted
                              //     ? 'checkbox active'
                              //     : 'checkbox'
                              // }
                              id={subtask.subtasksName}
                              onChange={(e) => {
                                handleCheckboxClick(e)
                              }}
                            />
                            {subtask.subtasksName}
                          </li>
                        )
                      })}
                    </ul>
                  )}
                  <p>cuurent status</p>
                  <div>{task.status}</div>
                </div>
              )
            }
          })
        })
      })}

      <br />
      <button onClick={() => handleSaveChanges()}>
        Save Changes
      </button>
    </div>
  )
}

export default ShowTaskDetail
