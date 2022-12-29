import { useEffect } from 'react'
import Image from 'next/image'

// TODO: bir boarda tıklayınca mobile sidebar kapanmalı

type MobileSideBarProps = {
  tasksData: any
  setTaskBoardFocus: any
  setIsMobileSideBarHidden: any
  isMobileSideBarHidden: boolean
  setWantedNewBoard: any
  mainData: any
  setMainData: any
}

function MobileSideBar({
  tasksData,
  setTaskBoardFocus,
  setIsMobileSideBarHidden,
  isMobileSideBarHidden,
  setWantedNewBoard,
  mainData,
  setMainData,
}: MobileSideBarProps) {
  function handleCreateNewBoard() {
    setWantedNewBoard(true)
    setIsMobileSideBarHidden(true)
  }
  function handleBoardClick(e: any) {
    setTaskBoardFocus(e)
    console.log(e)
    // console.log(e.target.innerText)
    // console.log(e.target.value)
    setIsMobileSideBarHidden(true)
  }
  return (
    <div
      className={
        isMobileSideBarHidden
          ? 'mobile--sidebar hidden'
          : 'mobile--sidebar'
      }
    >
      <div className="sidebar-container">
        <h3>All Boards ({mainData.boards.length})</h3>
        <div>
          <div className="sidebar--boards">
            {mainData.boards.map((board: any) => (
              <button
                className="board--button"
                key={board.name}
                onClick={(e) => handleBoardClick(board.name)}
              >
                <Image
                  className="board--icon"
                  src="/assets/icon-board.svg"
                  width={16}
                  height={16}
                  alt="arrow"
                />
                <p>{board.name}</p>
              </button>
            ))}
          </div>
          <button
            className="board--button b"
            onClick={() => {
              handleCreateNewBoard()
            }}
          >
            {/* TODO: theme ya göre icon gri yada beyaz olmalı */}
            <Image
              className="board--icon"
              src="/assets/icon-board-blue.svg"
              width={16}
              height={16}
              alt="arrow"
            />
            <p>+ Create New Board</p>
          </button>
        </div>
      </div>
      <br />
      <footer className="sideBarSettingsSide">
        <button className="toggle--light--dark">
          {/* TODO: image lar duruma göre yer değiştirmeli ona özel fonksiyon yaz */}
          <Image
            src="/assets/icon-light-theme.svg"
            width={18.33}
            height={18.33}
            alt="light"
          />
          <Image
            src="/assets/icon-dark-theme.svg"
            width={18.33}
            height={18.33}
            alt="dark"
          />
        </button>
      </footer>
    </div>
  )
}

export default MobileSideBar
