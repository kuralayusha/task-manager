import Head from 'next/head'
import Layout from '../components/Layout'
import TopBar from '../components/TopBar'
import TaskBoard from '../components/TaskBoard'
import SideBar from '../components/SideBar'

import Data from '../datas/data.json'
import { useEffect, useState } from 'react'

export default function Home() {
  const [isDark, setIsDark] = useState<boolean>(false)
  const [tasksData, setTasksData] = useState<any>(Data)
  const [isSideBarHidden, setIsSideBarHidden] =
    useState<boolean>(false)
  const [taskBoardFocus, setTaskBoardFocus] = useState<string>('')

  console.log(taskBoardFocus)

  // console.log(tasksData)
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
        <SideBar
          tasksData={tasksData}
          setTaskBoardFocus={setTaskBoardFocus}
        />
        <TopBar
          tasksData={tasksData}
          taskBoardFocus={taskBoardFocus}
        />
        {/* <TaskBoard /> */}
      </Layout>
    </>
  )
}
