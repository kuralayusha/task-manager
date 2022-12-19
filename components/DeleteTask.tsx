type DeleteTaskProps = {
  setWantedDeleteTask: any
}

function DeleteTask({ setWantedDeleteTask }: DeleteTaskProps) {
  return (
    <div>
      <h1>Delete this task?</h1>
      <p>
        Are you sure you want to delete the {/*TASK NAME*/} task and
        its subtasks? This action cannot be reversed.
      </p>
      <button>Delete</button>
      <button
        onClick={() => {
          setWantedDeleteTask(false)
        }}
      >
        Cancle
      </button>
    </div>
  )
}

export default DeleteTask
