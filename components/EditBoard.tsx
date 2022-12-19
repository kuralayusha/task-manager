type EditBoardProps = {
  setWantedEditBoard: any
}

function EditBoard({ setWantedEditBoard }: EditBoardProps) {
  return (
    <div>
      <h1>Edit Board</h1>
      <label>Board Name</label>
      <input type="text" name="boardName" id="boardName" />
      <label>Board Columns</label>
      <input type="text" />
      <button>X</button>
      <button>+ Add New Column</button>
      <button
        onClick={() => {
          setWantedEditBoard(false)
        }}
      >
        Save Changes
      </button>
    </div>
  )
}

export default EditBoard
