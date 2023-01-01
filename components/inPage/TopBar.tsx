import Image from 'next/image'

// import LogoMobile from '../public/assets/logo-mobile.svg'

type TopBarProps = {
  tasksData: any
  taskBoardFocus: any
  setWantedNewTask: any
  setWantedEditBoard: any
  setIsMobileSideBarHidden: any
  isMobileSideBarHidden: any
}

function TopBar({
  tasksData,
  taskBoardFocus,
  setWantedNewTask,
  setWantedEditBoard,
  setIsMobileSideBarHidden,
  isMobileSideBarHidden,
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
      <div className="app--logo mobile">
        <Image
          src="/assets/logo-mobile.svg"
          width={24}
          height={25}
          alt="logo"
        />
      </div>
      <div className="app--logo dark">
        <Image
          src="/assets/logo-dark.svg"
          width={152.53}
          height={25.22}
          alt="logo"
        />
      </div>
      <h1 className="board-title">
        <p>{boardTitle}</p>
        {isMobileSideBarHidden ? (
          <button
            className="btn-bar"
            onClick={() => setIsMobileSideBarHidden(false)}
          >
            <Image
              src="/assets/icon-chevron-down.svg"
              width={10}
              height={8}
              alt="arrow"
            />
          </button>
        ) : (
          <button
            className="btn-bar"
            onClick={() => setIsMobileSideBarHidden(true)}
          >
            <Image
              src="/assets/icon-chevron-up.svg"
              width={10}
              height={8}
              alt="arrow"
            />
          </button>
        )}
      </h1>
      <div className="top--bar--content">
        <div className="top--bar--btns">
          <button
            className="add-task--btn"
            onClick={handleAddNewTask}
          >
            <Image
              src="/assets/icon-add-task-mobile.svg"
              width={16}
              height={16}
              alt="plus"
            />
          </button>
          <button
            className="settings--btn"
            onClick={handleBoardSettings}
          >
            <Image
              src="/assets/icon-vertical-ellipsis.svg"
              width={3.69}
              height={16}
              alt="settings"
            />
          </button>
        </div>
        <div />
      </div>
    </div>
  )
}

export default TopBar
