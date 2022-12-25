type ShowTaskDetailProps = {
  setShowTaskDetails: any
  setWantedEditTask: any
  taskDetailFocus: any
  mainData: any
}

function ShowTaskDetail({
  setShowTaskDetails,
  setWantedEditTask,
  taskDetailFocus,
  mainData,
}: ShowTaskDetailProps) {
  // this page is for showing the details of a task
  // first we need to render the task title
  // then we need to render the task description
  // then we need to render the tasks subtasks in a checklist
  // then we need to render the current task status
  return (
    <div>
      <button
        onClick={() => {
          setWantedEditTask(true)
        }}
      >
        ...
      </button>

      <h1>{taskDetailFocus}</h1>
      {mainData.boards.map((board: any) => {
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
                  {/* <h3>{task.status}</h3> */}
                  {/* <h3>{task.subtasks}</h3> */}
                </div>
              )
            }
          })
        })
      })}

      <br />
      <button
        onClick={() => {
          setShowTaskDetails(false)
        }}
      >
        Save Changes
      </button>
    </div>
  )
}

export default ShowTaskDetail
