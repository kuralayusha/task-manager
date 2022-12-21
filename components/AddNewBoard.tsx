import React, { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

type AddNewBoardProps = {
  setWantedNewBoard: any
  setTasksData: any
  tasksData: any
  mainData: any
  setMainData: any
}

function AddNewBoard({
  setWantedNewBoard,
  setTasksData,
  tasksData,
  mainData,
  setMainData,
}: AddNewBoardProps) {
  const [counter, setCounter] = useState<number | string | any>(1)
  const [boardNameIs, setBoardNameIs] = useState<string | any>('')
  const [columsNameAre, setColumsNameAre] = useState<string | any>([])
  const [columnsArray, setColumnsArray] = useState<string | any>([])

  useEffect(() => {
    localStorage.setItem('mainData', JSON.stringify(mainData))
    // console.log('gönderildi')
  }, [mainData])
  //   handleChangeBoardName sets the state of boardNameIs to the value of the input
  //   handleChangeColumsName sets the state of columsNameAre to the value of the input
  //   handleClick  adds 1 to the counter state and creates a new input field for each column and sets the state of columsNameAre to the value of the input and pushes it to the array and for each input it gives different ids
  //    handleCreateBoard creates a new board and pushes it to the array of boards in the mainData state and sets the state of tasksData to the new array of boards and sets the state of wantedNewBoard to false

  const handleChangeBoardName = (e: any) => {
    setBoardNameIs(e.target.value)
  }

  const handleChangeColumsName = (e: any) => {
    setColumsNameAre(e.target.value)
  }

  const handleClick = () => {
    setColumnsArray([...columnsArray, columsNameAre])
    setColumsNameAre('')
    setCounter(counter + 1)
  }

  const handleCreateBoard = () => {
    setMainData({
      ...mainData,
      boards: [
        ...mainData.boards,
        {
          name: boardNameIs,
          columns: [columnsArray],
        },
      ],
    })
    setTimeout(() => {
      setWantedNewBoard(false)
    }, 100)
  }

  // the use effect should starts when the state of mainData changes and stores the data in the local storage

  // console.log({ boardNameIs })
  // console.log({ columsNameAre })
  // console.log({ mainData })
  // console.log({ columnsArray })

  return (
    <div className="add-new-board">
      <h3>Add New Board</h3>
      <div>
        <label htmlFor="board-name">Board Name</label>
        <input
          type="text"
          name="board-name"
          id="board-name"
          value={boardNameIs}
          onChange={(e) => handleChangeBoardName(e)}
        />
        <br />
        <label htmlFor="">Columns</label>
        {Array.from(Array(counter)).map((c, index) => {
          return (
            <div key={c}>
              <br />{' '}
              <input
                // value={columsNameAre}
                type="text"
                onChange={(e) => handleChangeColumsName(e)}
              ></input>
            </div>
          )
        })}
        <br />
        <button type="button" onClick={handleClick}>
          + Add This Column
        </button>
        <br />
        <button onClick={handleCreateBoard}>Create New Board</button>
      </div>
    </div>
  )
}

export default AddNewBoard
