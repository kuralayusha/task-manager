import React from 'react'
import SideBar from './SideBar'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <SideBar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
