type DeleteTaskProps = {
  setWantedDeleteTask: any
  setMainData: any
  taskDetailFocus: any
  mainData: any
  setTaskDetailFocus: any
}

function DeleteTask({
  setWantedDeleteTask,
  setMainData,
  taskDetailFocus,
  mainData,
  setTaskDetailFocus,
}: DeleteTaskProps) {
  function handleDeleteTask() {
    const mainDataCopy = { ...mainData }
    mainDataCopy.boards.map((board: any) => {
      board.columns.map((column: any) => {
        column.tasks.map((task: any) => {
          if (task.title === taskDetailFocus) {
            const index = column.tasks.indexOf(task)
            column.tasks.splice(index, 1)
          }
        })
      })
    })

    setMainData(mainData)
    localStorage.setItem('mainData', JSON.stringify(mainData))
    setTaskDetailFocus('')
    setWantedDeleteTask(false)
  }

  return (
    <div>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the "{taskDetailFocus}" task
        and its subtasks? This action cannot be reversed.
      </p>
      <button
        onClick={() => {
          handleDeleteTask()
        }}
      >
        Delete
      </button>
      <button
        onClick={() => {
          setWantedDeleteTask(false)
        }}
      >
        Cancel
      </button>
    </div>
  )
}

export default DeleteTask
