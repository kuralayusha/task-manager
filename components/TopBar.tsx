type TopBarProps = {
  tasksData: any
  taskBoardFocus: any
}

function TopBar({ tasksData, taskBoardFocus }: TopBarProps) {
  const boardTitle = taskBoardFocus

  return (
    <div className="top-bar">
      <div>
        <div className="logo">TASK LOGO</div>
      </div>
      <div>
        <h1 className="board-title">{boardTitle}</h1>
        <div>
          <button>+ Add New Task</button>
          <button>...</button>
        </div>
        <div />
      </div>
    </div>
  )
}

export default TopBar
