import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

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
      // console.log({ subtasksArray })

      return newTaskData
    })

    setSubtasksName('')
    // setCounter(counter + 1)
    // console.log({ subtasksArray })
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
    if (newTaskData.title !== '') {
      localStorage.setItem('mainData', JSON.stringify(mainData))
    } else {
      alert('Please enter a title')
    }
    setWantedEditTask(false)
  }

  function openDeleteOption() {
    setWantedEditTask(false)
    setWantedDeleteTask(true)
  }

  return (
    <div className="about--task">
      <h1 className="task--h1">Edit Task</h1>

      {newTaskData.title !== '' && (
        <div className="container-for--task">
          <p>Task Title</p>
          <input
            className="task--title"
            type="text"
            id="taskTitle"
            placeholder="e.g. Take coffee break"
            defaultValue={newTaskData.title}
            onChange={(e) => {
              handleTitleChange(e)
            }}
          />
          <br />
          <p>Task Description</p>
          <input
            className="task--description"
            type="text"
            id="taskDescription"
            placeholder="e.g. It's always good to take a break."
            defaultValue={newTaskData.description}
            onChange={(e) => {
              handleDescriptionChange(e)
            }}
          />
          <br />
          <p>Task Subtasks</p>

          <ul>
            {newTaskData.subtasks.map((subtask: any) => {
              return (
                <li
                  id={subtask.subtasksName}
                  key={subtask.subtasksName}
                >
                  <button
                    className="subtask-name--btn"
                    // checked={subtask.isCompleted}
                    id={subtask.subtasksName}
                    defaultValue={subtask.subtasksName}
                    // onChange={(e) => {
                    //   handleSubtaskChange
                    // }}
                  >
                    {subtask.subtasksName}
                  </button>
                  <button
                    className="cross--btn"
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
                    className="subtask-name--btn"
                    placeholder="Subtask Name"
                    type="text"
                    onChange={(e) => handleSubtaskChange(e)}
                  ></input>
                </div>
              )
            })}
          </ul>

          <button
            className="task-create--btn add"
            onClick={(e) => {
              handleSubtaskAdd(e)
            }}
          >
            + Add This Subtask
          </button>
          <br />

          <button
            className="task-create--btn save"
            onClick={handleSaveChanges}
          >
            Save Changes
          </button>
          <button
            className="task-create--btn delete"
            onClick={openDeleteOption}
          >
            Delete This Task
          </button>
        </div>
      )}
    </div>
  )
}

export default EditTask
