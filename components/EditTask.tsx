import React, { useState, useEffect, useRef } from 'react'

type TaskBoardProps = {
  setWantedEditTask: any
  setWantedDeleteTask: any
  taskDetailFocus: any
  mainData: any
  setMainData: any
  taskBoardFocus: any
}

function EditTask({
  setWantedEditTask,
  setWantedDeleteTask,
  taskDetailFocus,
  mainData,
  setMainData,
  taskBoardFocus,
}: TaskBoardProps) {
  const [a, render] = useState<boolean>(false)
  const [statusOptions, setStatusOptions] = useState<any>([])
  const [newTaskData, setNewTaskData] = useState<any>({
    title: '',
    description: '',
    subtasks: [],
    status: '',
  })
  const [subtasksArray, setSubtasksArray] = useState<any>([])
  const [counter, setCounter] = useState<number | string | any>(1)
  const [subtasksName, setSubtasksName] = useState<any>('')

  // when users comes here the page should render the in the input fields the data of the taskDetailFocus
  useEffect(() => {
    mainData.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.map((column: any) => {
          if (!statusOptions.includes(column.columsNameAre)) {
            // console.log('does not exist')

            setStatusOptions((prev: any) => [
              ...prev,
              column.columsNameAre,
            ])
          } else {
            // console.log('already exists')
          }
          handleMoreOptions()
        })
      }

      mainData.boards.map((board: any) => {
        if (board.name === taskBoardFocus) {
          board.columns.map((column: any) => {
            column.tasks.map((task: any) => {
              if (task.title === taskDetailFocus) {
                setNewTaskData((prev: any) => {
                  const newTaskData = prev
                  newTaskData.title = task.title
                  newTaskData.description = task.description
                  newTaskData.subtasks = task.subtasks
                  newTaskData.status = task.status
                  return newTaskData
                })
              }
            })
          })
        }
      })
    })
  }, [])

  function handleMoreOptions() {
    setStatusOptions((prev: any) => {
      const newOptions = prev.filter(
        (option: any, index: number) => prev.indexOf(option) === index
      )
      return newOptions
    })
  }

  function handleTitleChange(e: any) {
    console.log(e.target.value)
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.title = e.target.value
      return newTaskData
    })
  }

  function handleDescriptionChange(e: any) {
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.description = e.target.value
      return newTaskData
    })
  }

  // we map over the subtasks array and filter out the subtask that has the same name as the button that was clicked
  // and then we set the subtasks array to the new datas subtasks array

  function handleSubtaskDelete(e: any) {
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.subtasks = newTaskData.subtasks.filter(
        (subtask: any) => subtask.subtasksName !== e.target.value
      )
      return newTaskData
    })
    render(!a)
  }

  function handleSubtaskChange(e: any) {
    setSubtasksName(e.target.value)
    console.log(e.target.value)
  }

  function handleSubtaskAdd(e: any) {
    setSubtasksArray((prev: any) => [
      ...prev,
      { subtasksName, isCompleted: false },
    ])

    setNewTaskData((prev: any) => {
      const newTaskData = prev
      setNewTaskData({
        ...newTaskData,
        subtasks: [
          ...newTaskData.subtasks,
          { subtasksName, isCompleted: false },
        ],
      })
      console.log({ subtasksArray })

      return newTaskData
    })

    setSubtasksName('')
    // setCounter(counter + 1)
    console.log({ subtasksArray })
  }

  function handleSaveChanges() {
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      setNewTaskData({
        ...newTaskData,
        subtasks: [
          ...newTaskData.subtasks,
          { subtasksName, isCompleted: false },
        ],
      })
      console.log({ subtasksArray })

      return newTaskData
    })
    console.log({ subtasksArray })
    mainData.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.map((column: any) => {
          column.tasks.map((task: any) => {
            if (task.title === taskDetailFocus) {
              if (newTaskData.title === '') {
                newTaskData.title = task.title
              } else {
                task.title = newTaskData.title
              }

              if (newTaskData.description === '') {
                newTaskData.description = task.description
              } else {
                task.description = newTaskData.description
              }

              if (newTaskData.status === '') {
                newTaskData.status = task.status
              } else {
                task.subtasks = newTaskData.subtasks
              }
            }
          })
        })
      }
    })
    localStorage.setItem('mainData', JSON.stringify(mainData))
    setWantedEditTask(false)
  }

  return (
    <div>
      <h1>Edit Task</h1>

      {/* {mainData.boards.map((board: any) => {
        return board.columns.map((column: any) => {
          return column.tasks.map((task: any) => {
            if (task.title === taskDetailFocus) {
              return (
                <div key={task.title}>
                  <label>title</label>
                  <input
                    type="text"
                    id="taskTitle"
                    defaultValue={task.title}
                    onChange={(e) => {
                      handleTitleChange(e)
                    }}
                  />
                  <br />
                  <label>description</label>
                  <input
                    type="text"
                    id="taskDescription"
                    defaultValue={task.description}
                    onChange={(e) => {
                      handleDescriptionChange(e)
                    }}
                  />
                  <br />
                  <label>task Subtasks</label>

                  {task.subtasks.length >= 1 && (
                    <ul>
                      {task.subtasks.map((subtask: any) => {
                        return (
                          <li key={subtask.title}>
                            <input
                              type="input"
                              checked={subtask.isCompleted}
                              id={subtask.subtasksName}
                              defaultValue={subtask.subtasksName}
                              // onChange={(e) => {
                              //   handleSubtaskChange
                              // }}
                            />
                            <button
                              value={subtask.subtasksName}
                              onClick={(e) => {
                                handleSubtaskDelete(e)
                              }}
                            >
                              X
                            </button>
                          </li>
                        )
                      })}

                      {Array.from(Array(counter)).map((c, index) => {
                        return (
                          <div key={c}>
                            {' '}
                            <input
                              // value={columsNameAre}
                              placeholder="Subtask Name"
                              type="text"
                              onChange={(e) => handleSubtaskChange(e)}
                            ></input>
                          </div>
                        )
                      })}
                    </ul>
                  )}
                  <button onClick={handleSubtaskAdd}>
                    Add SubTask
                  </button>
                  <br />

                  <button onClick={handleSaveChanges}>
                    Save Changes
                  </button>
                </div>
              )
            }
          })
        })
      })} */}
      {newTaskData.title !== '' && (
        <div>
          <label>title</label>
          <input
            type="text"
            id="taskTitle"
            defaultValue={newTaskData.title}
            onChange={(e) => {
              handleTitleChange(e)
            }}
          />
          <br />
          <label>description</label>
          <input
            type="text"
            id="taskDescription"
            defaultValue={newTaskData.description}
            onChange={(e) => {
              handleDescriptionChange(e)
            }}
          />
          <br />
          <label>task Subtasks</label>

          <ul>
            {newTaskData.subtasks.map((subtask: any) => {
              return (
                <li
                  id={subtask.subtasksName}
                  key={subtask.subtasksName}
                >
                  <input
                    type="input"
                    checked={subtask.isCompleted}
                    id={subtask.subtasksName}
                    defaultValue={subtask.subtasksName}
                    // onChange={(e) => {
                    //   handleSubtaskChange
                    // }}
                  />
                  <button
                    value={subtask.subtasksName}
                    onClick={(e) => {
                      handleSubtaskDelete(e)
                    }}
                  >
                    X
                  </button>
                </li>
              )
            })}
            {Array.from(Array(counter)).map((c, index) => {
              return (
                <div key={c}>
                  {' '}
                  <input
                    // value={columsNameAre}
                    placeholder="Subtask Name"
                    type="text"
                    onChange={(e) => handleSubtaskChange(e)}
                  ></input>
                </div>
              )
            })}
          </ul>

          <button
            onClick={(e) => {
              handleSubtaskAdd(e)
            }}
          >
            Add SubTask
          </button>
          <br />

          <button onClick={handleSaveChanges}>Save Changes</button>
        </div>
      )}
    </div>
  )
}

export default EditTask
