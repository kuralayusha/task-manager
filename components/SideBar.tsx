import { useEffect } from 'react'

type SideBarProps = {
  tasksData: any
  setTaskBoardFocus: any
  setIsSideBarHidden: any
  isSideBarHidden: boolean
  setWantedNewBoard: any
  mainData: any
  setMainData: any
}

function SideBar({
  tasksData,
  setTaskBoardFocus,
  setIsSideBarHidden,
  isSideBarHidden,
  setWantedNewBoard,
  mainData,
  setMainData,
}: SideBarProps) {
  useEffect(() => {
    const data = localStorage.getItem('mainData')
    if (data) {
      setMainData(JSON.parse(data))
    }
  }, [])
  return (
    <div className={isSideBarHidden ? 'sidebar hidden' : 'sidebar'}>
      <div className="taskSide">
        <h3>All Boards ({tasksData.boards.length})</h3>
        {/* TODO: we have to map all boards 
        and take them titles then for each title there
        shoul a button. */}
        {mainData.boards.map((board: any) => (
          <button
            key={board.name}
            onClick={() => setTaskBoardFocus(board.name)}
          >
            {board.name}
          </button>
        ))}
        <button
          onClick={() => {
            setWantedNewBoard(true)
          }}
        >
          +Create New Board
        </button>
      </div>
      <br />
      <footer className="sideBarSettingsSide">
        <div className="toggle--light--dark">
          {/* img */}
          <button>toggle light-dark</button>
          {/* img */}
        </div>
        <button
          onClick={() => {
            setIsSideBarHidden(true)
          }}
        >
          {/* eye img */}
          Hide Sidebar
        </button>
      </footer>
    </div>
  )
}

export default SideBar
