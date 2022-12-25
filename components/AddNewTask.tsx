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
}

function AddNewTask({
  setWantedNewTask,
  taskBoardFocus,
  mainData,
}: AddNewTaskProps) {
  const [statusOptions, setStatusOptions] = useState<any>([])

  // useEffect looks inside the taskBoardFocus and then it will take the columns names and put them in the status options as an array

  // but if there is more than one column with the same name it will not add it to the array
  useEffect(() => {
    mainData.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.map((column: any) => {
          if (!statusOptions.includes(column.columsNameAre)) {
            console.log('does not exist')

            setStatusOptions((prev: any) => [
              ...prev,
              column.columsNameAre,
            ])
          } else {
            console.log('already exists')
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

  function handleCreate(e: any) {
    e.preventDefault()
    setWantedNewTask(false)
    setStatusOptions([])
  }
  console.log({ statusOptions })

  return (
    <div className="AddNewTask">
      <h1>Add New Task</h1>
      <form>
        <p>Task Title</p>
        <input type="text" name="taskTitle" id="taskTitle" />

        <p>Task Description</p>
        <input
          type="text"
          name="taskDescription"
          id="taskDescription"
        />

        <p>Task Subtasks</p>
        <input type="text" name="taskSubtasks" id="taskSubtasks" />
        <br />
        <button>+Add New Subtask</button>

        <p>Status</p>
        <select>
          {statusOptions.map((option: any) => {
            return <option value={option}>{option}</option>
          })}
        </select>

        <br />
        <button onClick={handleCreate}>Create Task</button>
      </form>
    </div>
  )
}

export default AddNewTask
