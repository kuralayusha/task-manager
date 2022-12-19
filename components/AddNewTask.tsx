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
        <label>Task Title</label>
        <input type="text" name="taskTitle" id="taskTitle" />

        <label>Task Description</label>
        <input
          type="text"
          name="taskDescription"
          id="taskDescription"
        />

        <label>Task Subtasks</label>
        <input type="text" name="taskSubtasks" id="taskSubtasks" />
        <button>X</button>
        <button>+Add New Subtask</button>

        <label>Status</label>
        <section>
          <option value="">abc</option>
          <option value="">abc</option>
          <option value="">abc</option>
        </section>
        <button onClick={handleCreate}>Create Task</button>
      </form>
    </div>
  )
}

export default AddNewTask
