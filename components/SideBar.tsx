type SideBarProps = {
  tasksData: any
  setTaskBoardFocus: any
}

function SideBar({ tasksData, setTaskBoardFocus }: SideBarProps) {
  // console.log(tasksData.boards[0].name)

  return (
    <div className="sidebar">
      <div className="taskSide">
        <h3>All Boards ({tasksData.boards.length})</h3>
        {/* TODO: we have to map all boards 
        and take them titles then for each title there
        shoul a button. */}
        {tasksData.boards.map((board: any) => (
          <button
            key={board.name}
            onClick={() => setTaskBoardFocus(board.name)}
          >
            {board.name}
          </button>
        ))}
        <button>+Create New Board</button>
      </div>
      <br />
      <footer className="sideBarSettingsSide">
        <div className="toggle--light--dark">
          {/* img */}
          <button>toggle light-dark</button>
          {/* img */}
        </div>
        <button>
          {/* eye img */}
          Hide Sidebar
        </button>
      </footer>
    </div>
  )
}

export default SideBar
