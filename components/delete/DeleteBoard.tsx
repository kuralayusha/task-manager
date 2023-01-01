type DeleteBoardProps = {
  setWantedDeleteBoard: any
  setMainData: any
  taskBoardFocus: any
  mainData: any
  setTaskBoardFocus: any
}

function DeleteBoard({
  setWantedDeleteBoard,
  setMainData,
  taskBoardFocus,
  mainData,
  setTaskBoardFocus,
}: DeleteBoardProps) {
  // when user click to delete board
  // first take the mainData and map it
  // then find the board that user want to delete with taskBoardFocus
  // then delete it
  function handleDeleteBoard() {
    const mainDataCopy = { ...mainData }
    mainDataCopy.boards.map((board: any, index: number) => {
      if (board.name === taskBoardFocus) {
        mainDataCopy.boards.splice(index, 1)
      }
    })
    setMainData(mainDataCopy)
    localStorage.setItem('mainData', JSON.stringify(mainData))
    setTaskBoardFocus('')
    setWantedDeleteBoard(false)
  }
  return (
    <div className="delete-section">
      <h1>Delete this board?</h1>
      <p>
        Are you sure you want to delete the {''}
        <label className="focus-label">"{taskBoardFocus}"</label> {''}
        board? This action will remove all columns and tasks and
        cannot be reversed.
      </p>
      <button
        className="task-create--btn delete"
        onClick={() => {
          handleDeleteBoard()
        }}
      >
        Delete
      </button>
      <button
        className="task-create--btn add"
        onClick={() => setWantedDeleteBoard(false)}
      >
        Cancel
      </button>
    </div>
  )
}

export default DeleteBoard
