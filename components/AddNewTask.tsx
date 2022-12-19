type AddNewTaskProps = {
  setWantedNewTask: any
}

function AddNewTask({ setWantedNewTask }: AddNewTaskProps) {
  function handleCreate() {
    setWantedNewTask(false)
  }
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
        <button>X</button>
        <br />
        <button>+Add New Subtask</button>

        <p>Status</p>
        <select>
          <option value="">abc</option>
          <option value="">abc</option>
          <option value="">abc</option>
        </select>

        <br />
        <button onClick={handleCreate}>Create Task</button>
      </form>
    </div>
  )
}

export default AddNewTask
