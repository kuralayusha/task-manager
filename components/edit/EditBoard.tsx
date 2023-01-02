import React, { useEffect, useState } from 'react'

type EditBoardProps = {
  setWantedEditBoard: any
  setWantedDeleteBoard: any
  taskBoardFocus: any
  mainData: any
  setMainData: any
  setNewBoardData: any
  newBoardData: any
}

function EditBoard({
  setWantedEditBoard,
  setWantedDeleteBoard,
  taskBoardFocus,
  mainData,
  setMainData,
  setNewBoardData,
  newBoardData,
}: EditBoardProps) {
  const [a, render] = useState<boolean>(false)
  const [counter, setCounter] = useState<number | string | any>(1)
  const [columnName, setColumnName] = useState<string>('')

  function handleBoardNameChange(e: any) {
    const newBoardDataCopy = { ...newBoardData }
    newBoardDataCopy.boards.map((board: any) => {
      board.name = e.target.value
      console.log('yapiyom')
    })
    setNewBoardData(newBoardDataCopy)
  }

  function handleColumnDelete(e: any) {
    const newBoardDataCopy = { ...newBoardData }
    newBoardDataCopy.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.map((column: any, index: number) => {
          if (column.columsNameAre === e.target.value) {
            board.columns.splice(index, 1)
          }
        })
      }
    })
    setNewBoardData(newBoardDataCopy)
  }

  // when user click to add new column
  // first take the
  function handleColumnAdd() {
    const newBoardDataCopy = { ...newBoardData }
    newBoardDataCopy.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.columns.push({
          columsNameAre: columnName,
          tasks: [],
        })
      }
    })
    setNewBoardData(newBoardDataCopy)
  }

  function handleColumnChange(e: any) {
    setColumnName(e.target.value)
    console.log(e.target.value)
  }

  console.log(newBoardData.boards[0].name)

  // when user click to save changes
  // first find the board that user want to edit in main data
  // then replace the board with new board data
  function handleSaveChanges() {
    const mainDataCopy = { ...mainData }
    mainDataCopy.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        board.name = newBoardData.boards[0].name
        board.columns = newBoardData.boards[0].columns
      }
    })
    // if the board name is empty then dont save
    if (newBoardData.boards[0].name === '') {
      console.log('empty')

      alert('Board name cannot be empty')
      setWantedEditBoard(false)
    } else {
      console.log('not empty')

      setMainData(mainDataCopy)
      localStorage.setItem('mainData', JSON.stringify(mainData))
      setWantedEditBoard(false)
    }
  }

  function openDeleteOption() {
    if (newBoardData.boards[0].name === '') {
      alert('Board name cannot be empty')
    } else {
      setWantedDeleteBoard(true)
      setWantedEditBoard(false)
    }
  }

  // console.log(newBoardData.boards)
  console.log({ taskBoardFocus })
  console.log({ newBoardData })
  console.log({ mainData })
  return (
    <div className="for-board edit">
      <h3>Edit Board</h3>
      {newBoardData.boards.map((board: any) => {
        if (taskBoardFocus) {
          return (
            <div className="for-board--container">
              <p>Board Name</p>
              <input
                className="show--info--part title"
                type="text"
                defaultValue={board.name}
                onChange={(e) => handleBoardNameChange(e)}
              />
              <p>Columns</p>
              <ul>
                {board.columns.map((column: any) => {
                  return (
                    <li
                      id={column.columsNameAre}
                      key={column.columsNameAre}
                    >
                      <button
                        className="show--info--part"
                        id={column.columsNameAre}
                        key={column.columsNameAre}
                      >
                        {column.columsNameAre}
                      </button>
                      <button
                        className="cross--btn"
                        value={column.columsNameAre}
                        onClick={(e) => {
                          handleColumnDelete(e)
                        }}
                      >
                        X
                      </button>
                    </li>
                  )
                })}
              </ul>
              {Array.from(Array(counter)).map((c, index) => {
                return (
                  <div key={c}>
                    {' '}
                    <input
                      className="show--info--part"
                      // value={columsNameAre}
                      placeholder="Column Name"
                      type="text"
                      onChange={(e) => handleColumnChange(e)}
                    ></input>
                  </div>
                )
              })}
              <button
                className="task-create--btn add"
                onClick={() => {
                  handleColumnAdd()
                }}
              >
                + Add This Subtask
              </button>
            </div>
          )
        }
      })}

      <button
        className="task-create--btn save"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
      <button
        className="task-create--btn delete"
        onClick={openDeleteOption}
      >
        Delete This Board
      </button>
    </div>
  )
}

export default EditBoard
