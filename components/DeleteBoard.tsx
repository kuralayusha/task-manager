type DeleteBoardProps = {
  setWantedDeleteBoard: any
}

function DeleteBoard({ setWantedDeleteBoard }: DeleteBoardProps) {
  return (
    <div>
      <h1>Delete this board?</h1>
      <p>
        Are you sure you want to delete the {/*BOARD NAME*/} board?
        This action will remove all columns and tasks and cannot be
        reversed.
      </p>
      <button>Delete</button>
      <button
        onClick={() => {
          setWantedDeleteBoard(false)
        }}
      >
        Cancle
      </button>
    </div>
  )
}

export default DeleteBoard
