// TODO: AddNewTask component
// first when the user comes here this component have to know which board the user wants to add a new task to
// we will controll that with the state of taskBoardFocus
// so the user could type in the title, description, subtasks, status, and create a new task
// also in status the user could choose from the options.
// the options are the same as the columns in the task board (mainData.boards.columns)
// when the use clicks on create task, the task should be added to the mainData.boards.columns.tasks

import { useEffect, useState } from 'react'

type AddNewTaskProps = {
  setWantedNewTask: any
  taskBoardFocus: string
  mainData: any
  setMainData: any
}

function AddNewTask({
  setWantedNewTask,
  taskBoardFocus,
  mainData,
  setMainData,
}: AddNewTaskProps) {
  const [statusOptions, setStatusOptions] = useState<any>([])
  const [counter, setCounter] = useState<number | string | any>(1)
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [taskDescription, setTaskDescription] = useState<string>('')
  const [subtasksName, setSubtasksName] = useState<string>('')
  const [subtasksArray, setSubtasksArray] = useState<any>([])
  const [taskStatus, setTaskStatus] = useState<string>('')
  const [newTaskData, setNewTaskData] = useState<object>({
    title: '',
    description: '',
    subtasks: [],
    status: '',
  })

  // useEffect(() => {
  //   localStorage.setItem('mainData', JSON.stringify(mainData))
  //   // console.log('gönderildi')
  // }, [mainData])

  // useEffect looks inside the taskBoardFocus and then it will take the columns names and put them in the status options as an array
  // but if there is more than one column with the same name it will not add it to the array
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
    })
  }, [])

  // this function will be called when options are created
  // it will remove the options that are already in the statusOptions array
  function handleMoreOptions() {
    setStatusOptions((prev: any) => {
      const newOptions = prev.filter(
        (option: any, index: number) => prev.indexOf(option) === index
      )
      return newOptions
    })
  }

  // when the user types in the task title, it will be setted to the newTaskDatas Title state
  function handleTaskTitleChange(e: any) {
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.title = e.target.value
      return newTaskData
    })
  }

  // when the user types in the task description, it will be setted to the newTaskDatas Description state
  function handleTaskDescriptionChange(e: any) {
    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.description = e.target.value
      return newTaskData
    })
  }

  // when the user selects the task status, it will be setted to the newTaskDatas Status state
  function handleSubtaskNameChange(e: any) {
    setSubtasksName(e.target.value)
  }

  // when the user clicks to add this subtask, it will be added to the subtasksArray state, and the subtasksName state will be setted to empty, and the counter will be increased by 1
  const handleAddSubtask = () => {
    setSubtasksArray([
      ...subtasksArray,
      { subtasksName, isCompleted: false },
    ])

    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.subtasks = [
        ...subtasksArray,
        { subtasksName, isCompleted: false },
      ]
      return newTaskData
    })

    setSubtasksName('')
    setCounter(counter + 1)
  }

  function handleStatusChange(e: any) {
    setTaskStatus(e.target.value)

    setNewTaskData((prev: any) => {
      const newTaskData = prev
      newTaskData.status = e.target.value
      return newTaskData
    })
  }

  //when user clicks on create task, the task should be setted to the mainData.boards.columns.tasks
  function handleCreateTask() {
    mainData.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.map((column: any) => {
          if (column.columsNameAre === taskStatus) {
            console.log(column)

            column.tasks.push(newTaskData)
          }
        })
      }
    })
    setMainData(mainData)

    localStorage.setItem('mainData', JSON.stringify(mainData))

    setTimeout(() => {
      setWantedNewTask(false)
    }, 100)
  }

  // console.log({ subtasksArray })
  console.log({ newTaskData })
  // console.log(taskStatus)
  // console.log({ statusOptions })
  return (
    <div className="AddNewTask">
      <h1>Add New Task</h1>
      <div>
        <p>Task Title</p>
        <input
          required
          type="text"
          name="taskTitle"
          id="taskTitle"
          onChange={(e) => handleTaskTitleChange(e)}
        />

        <p>Task Description</p>
        <input
          type="text"
          name="taskDescription"
          id="taskDescription"
          onChange={(e) => handleTaskDescriptionChange(e)}
        />

        <p>Task Subtasks</p>
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <div key={c}>
              <br />{' '}
              <input
                // value={columsNameAre}
                type="text"
                onChange={(e) => handleSubtaskNameChange(e)}
              ></input>
            </div>
          )
        })}

        <button onClick={handleAddSubtask}>+ Add This Subtask</button>

        <p>Status</p>
        <select onChange={handleStatusChange}>
          <option value="">Select</option>
          {statusOptions.map((option: any) => {
            return <option value={option}>{option}</option>
          })}
        </select>

        <br />
        <button onClick={handleCreateTask}>Create Task</button>
      </div>
    </div>
  )
}

export default AddNewTask
