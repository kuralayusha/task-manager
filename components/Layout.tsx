import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <main>{children}</main>
    </div>
  )
}

export default Layout
