import { useEffect } from 'react'
import Image from 'next/image'

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
  return (
    <div className={isSideBarHidden ? 'sidebar hidden' : 'sidebar'}>
      <div className="taskSide">
        <h3>All Boards ({mainData.boards.length})</h3>
        {mainData.boards.map((board: any) => (
          <button
            className="board--buttons"
            key={board.name}
            onClick={() => setTaskBoardFocus(board.name)}
          >
            <Image
              src={'/assets/icon-board.svg'}
              width={16}
              height={16}
              alt="board icon"
            />
            <p>{board.name}</p>
          </button>
        ))}
        <button
          className="board--buttons create"
          onClick={() => {
            setWantedNewBoard(true)
          }}
        >
          <Image
            src={'/assets/icon-board-blue.svg'}
            width={16}
            height={16}
            alt="create new board"
          />
          <p>+Create New Board</p>
        </button>
      </div>
      <footer className="sideBarSettingsSide">
        <button className="toggle-light-dark">
          {/* <Image
            src={'/assets/icon-dark-theme.svg'}
            width={16}
            height={16}
            alt="theme"
          /> */}
          <Image
            src={'/assets/icon-light-theme.svg'}
            width={16}
            height={16}
            alt="theme"
          />
        </button>
        <button
          className="toggle-light-dark"
          onClick={() => {
            setIsSideBarHidden(true)
          }}
        >
          <Image
            src={'/assets/icon-hide-sidebar.svg'}
            width={16}
            height={16}
            alt="hide side bar"
          />
          <p>Hide Sidebar</p>
        </button>
      </footer>
    </div>
  )
}

export default SideBar
