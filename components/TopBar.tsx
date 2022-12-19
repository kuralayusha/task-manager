import AddNewTask from './AddNewTask'

type TopBarProps = {
  tasksData: any
  taskBoardFocus: any
  setWantedNewTask: any
}

function TopBar({
  tasksData,
  taskBoardFocus,
  setWantedNewTask,
}: TopBarProps) {
  const boardTitle = taskBoardFocus

  function handleAddNewTask() {
    setWantedNewTask(true)
  }

  return (
    <div className="top-bar">
      <div>
        <div className="logo">TASK LOGO</div>
      </div>
      <div>
        <h1 className="board-title">{boardTitle}</h1>
        <div>
          <button onClick={handleAddNewTask}>+ Add New Task</button>
          <button>...</button>
        </div>
        <div />
      </div>
    </div>
  )
}

export default TopBar
