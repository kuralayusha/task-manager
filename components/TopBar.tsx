import AddNewTask from './AddNewTask'
import { LogoMobile } from './assets'
// import LogoMobile from './assets/logo-mobile.svg'

type TopBarProps = {
  tasksData: any
  taskBoardFocus: any
  setWantedNewTask: any
  setWantedEditBoard: any
}

function TopBar({
  tasksData,
  taskBoardFocus,
  setWantedNewTask,
  setWantedEditBoard,
}: TopBarProps) {
  const boardTitle = taskBoardFocus

  function handleBoardSettings() {
    if (taskBoardFocus !== '') {
      setWantedEditBoard(taskBoardFocus)
    }
  }

  function handleAddNewTask() {
    setWantedNewTask(true)
  }

  return (
    <div className="top-bar">
      <div>
        <div className="app--logo">
          <LogoMobile />
        </div>
      </div>
      <div>
        <h1 className="board-title">{boardTitle}</h1>
        <div>
          <button onClick={handleAddNewTask}>+ Add New Task</button>
          <button onClick={handleBoardSettings}>...</button>
        </div>
        <div />
      </div>
    </div>
  )
}

export default TopBar
