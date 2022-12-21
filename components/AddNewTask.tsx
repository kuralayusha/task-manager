// TODO: AddNewTask component
// first when the user comes here this component have to know which board the user wants to add a new task to
// we will controll that with the state of taskBoardFocus
// so the user could type in the title, description, subtasks, status, and create a new task
// also in status the user could choose from the options.
// the options are the same as the columns in the task board (mainData.boards.columns)
// when the use clicks on create task, the task should be added to the mainData.boards.columns.tasks

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
      <button>...</button>
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
