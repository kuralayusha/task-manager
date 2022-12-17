import { useEffect } from 'react'

function TaskBoard() {
  return (
    <div className="task-board">
      {/* TODO: if there is no column show 
      a title and a button to add a new column */}
      {/* TODO: if there is a column map them and print evry column and 
      in every column print the tasks */}
      <div className="column">
        <h3 className="column--title">TODO (4)</h3>
        <button className="task">
          <h2>Build UI for onboarding flow</h2>
          <small>0 of 6 substast</small>
        </button>
        <button className="task">
          <h2>Build UI for onboarding flow</h2>
          <small>0 of 6 substast</small>
        </button>
        <button className="task">
          <h2>Build UI for onboarding flow</h2>
          <small>0 of 6 substast</small>
        </button>
        <button className="task">
          <h2>Build UI for onboarding flow</h2>
          <small>0 of 6 substast</small>
        </button>
      </div>
    </div>
  )
}

export default TaskBoard
