// TODO: if there is no board focuse u cant click to the add new tasks button

import useLocalStorage from '../hooks/useLocalStorage'

import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import TaskBoard from '../components/TaskBoard'
import SideBar from '../components/SideBar'
import AddNewTask from '../components/AddNewTask'
import EditBoard from '../components/EditBoard'
import EditTask from '../components/EditTask'
import DeleteBoard from '../components/DeleteBoard'
import DeleteTask from '../components/DeleteTask'
import ShowTaskDetail from '../components/ShowTaskDetail'
import AddNewBoard from '../components/AddNewBoard'

import Head from 'next/head'
import Data from '../datas/data.json'
import { useEffect, useState } from 'react'

export default function Home() {
  const [tasksData, setTasksData] = useState<any>(Data)
  const [isDark, setIsDark] = useState<boolean>(false)
  const [isSideBarHidden, setIsSideBarHidden] =
    useState<boolean>(false)
  const [taskBoardFocus, setTaskBoardFocus] = useState<string>('')
  const [taskDetailFocus, setTaskDetailFocus] = useState<string>('')

  const [wantedNewTask, setWantedNewTask] = useState<boolean>(false)
  const [wantedEditBoard, setWantedEditBoard] =
    useState<boolean>(false)
  const [wantedEditTask, setWantedEditTask] = useState<boolean>(false)
  const [wantedDeleteBoard, setWantedDeleteBoard] =
    useState<boolean>(false)
  const [wantedDeleteTask, setWantedDeleteTask] =
    useState<boolean>(false)
  const [ShowTaskDetails, setShowTaskDetails] =
    useState<boolean>(false)
  const [wantedNewBoard, setWantedNewBoard] = useState<boolean>(false)

  const [mainData, setMainData] = useState<any>({
    boards: [],
  })

  const [newBoardData, setNewBoardData] = useState<any>({
    boards: [
      {
        name: '',
        columns: [{ columsNameAre: [], tasks: [] }],
      },
    ],
  })

  useEffect(() => {
    const data = localStorage.getItem('mainData')
    if (data) {
      setMainData(JSON.parse(data))
    }
  }, [])

  useEffect(() => {
    mainData.boards.map((board: any) => {
      if (board.name === taskBoardFocus) {
        setNewBoardData((prev: any) => {
          const newBoardData = prev
          newBoardData.boards[0].name = board.name
          newBoardData.boards[0].columns = board.columns
          return newBoardData
        })
      }
    })
    console.log('güncelledim')
  }, [taskBoardFocus])

  // source destination

  // console.log(taskBoardFocus)
  // console.log(tasksData)
  // console.log(isSideBarHidden)
  // console.log({ taskDetailFocus })
  // console.log(mainData)

  return (
    <>
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="Generated by create next app"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <>
          {ShowTaskDetails && (
            <ShowTaskDetail
              setShowTaskDetails={setShowTaskDetails}
              setWantedEditTask={setWantedEditTask}
              taskDetailFocus={taskDetailFocus}
              mainData={mainData}
              setMainData={setMainData}
            />
          )}
          {wantedNewTask && (
            <AddNewTask
              setWantedNewTask={setWantedNewTask}
              taskBoardFocus={taskBoardFocus}
              mainData={mainData}
              setMainData={setMainData}
            />
          )}
          {wantedEditTask && (
            <EditTask
              setWantedEditTask={setWantedEditTask}
              setWantedDeleteTask={setWantedDeleteTask}
              taskDetailFocus={taskDetailFocus}
              mainData={mainData}
              setMainData={setMainData}
              taskBoardFocus={taskBoardFocus}
            />
          )}
          {wantedDeleteTask && (
            <DeleteTask
              setWantedDeleteTask={setWantedDeleteTask}
              setMainData={setMainData}
              taskDetailFocus={taskDetailFocus}
              mainData={mainData}
              setTaskDetailFocus={setTaskDetailFocus}
            />
          )}
        </>
        <>
          {wantedNewBoard && (
            <AddNewBoard
              setWantedNewBoard={setWantedNewBoard}
              setTasksData={setTasksData}
              tasksData={tasksData}
              mainData={mainData}
              setMainData={setMainData}
            />
          )}
          {wantedEditBoard && (
            <EditBoard
              setWantedEditBoard={setWantedEditBoard}
              setWantedDeleteBoard={setWantedDeleteBoard}
              taskBoardFocus={taskBoardFocus}
              mainData={mainData}
              setMainData={setMainData}
              setNewBoardData={setNewBoardData}
              newBoardData={newBoardData}
            />
          )}
          {wantedDeleteBoard && (
            <DeleteBoard
              setWantedDeleteBoard={setWantedDeleteBoard}
              setMainData={setMainData}
              mainData={mainData}
              taskBoardFocus={taskBoardFocus}
              setTaskBoardFocus={setTaskBoardFocus}
            />
          )}
        </>
        <TopBar
          tasksData={tasksData}
          taskBoardFocus={taskBoardFocus}
          setWantedNewTask={setWantedNewTask}
          setWantedEditBoard={setWantedEditBoard}
        />
        <div className="container">
          <SideBar
            tasksData={tasksData}
            setTaskBoardFocus={setTaskBoardFocus}
            setIsSideBarHidden={setIsSideBarHidden}
            isSideBarHidden={isSideBarHidden}
            setWantedNewBoard={setWantedNewBoard}
            mainData={mainData}
            setMainData={setMainData}
          />
          <TaskBoard
            tasksData={tasksData}
            taskBoardFocus={taskBoardFocus}
            wantedNewTask={wantedNewTask}
            setShowTaskDetails={setShowTaskDetails}
            setIsSideBarHidden={setIsSideBarHidden}
            isSideBarHidden={isSideBarHidden}
            mainData={mainData}
            setMainData={setMainData}
            setTaskDetailFocus={setTaskDetailFocus}
          />
        </div>
      </Layout>
    </>
  )
}
