function SideBar() {
  return (
    <div className="sidebar">
      <div className="taskSide">
        <h3>All Boards (3)</h3>
        {/* TODO: we have to map all boards 
        and take them titles then for each title there
        shoul a button. */}
        <button>Platform Launch</button>
        <button>Marketing Plan</button>
        <button>Roadmap</button>
        <button>+Create New Board</button>
      </div>
      <footer className="sideBarSettingsSide">
        <div className="toggle--light--dark">
          {/* img */}
          <button>toggle light-dark</button>
          {/* img */}
        </div>
        <button>
          {/* eye img */}
          Hide Sidebar
        </button>
      </footer>
    </div>
  )
}

export default SideBar
