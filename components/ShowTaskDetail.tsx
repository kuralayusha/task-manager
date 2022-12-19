type ShowTaskDetailProps = {
  setShowTaskDetails: any
  setWantedEditTask: any
}

function ShowTaskDetail({
  setShowTaskDetails,
  setWantedEditTask,
}: ShowTaskDetailProps) {
  return (
    <div>
      <button
        onClick={() => {
          setWantedEditTask(true)
        }}
      >
        ...
      </button>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        Fugit explicabo, qui asperiores esse eos ipsa tempore. Ipsam
        neque placeat modi.
      </p>
      <small>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
        aut fuga hic iure laborum, nostrum laudantium delectus quidem
        quod ex vitae autem et at, vero in blanditiis cum
        exercitationem! Amet.
      </small>
      <br />
      <small>2of3</small>
      <input type="checkbox" checked />
      <label>Research competitor pricing and business models</label>
      <input type="checkbox" />
      <label>Research competitor pricing and business models</label>
      <input type="checkbox" />
      <label>Research competitor pricing and business models</label>

      <label>Current Status</label>
      <select>
        <option value="">1</option>
        <option value="">2</option>
        <option value="">3</option>
      </select>
      <br />
      <button
        onClick={() => {
          setShowTaskDetails(false)
        }}
      >
        Save Changes
      </button>
    </div>
  )
}

export default ShowTaskDetail
