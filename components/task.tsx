import { Task as TaskType } from "@customTypes/data";
import React from "react";
import { useModalStore } from "@store/modal";

type TaskProps = { columnId?: number } & TaskType;

const Task = ({ title, subtasks, id, columnId }: TaskProps) => {
  const { setModal, setModalData } = useModalStore();

  const subtasksLength = subtasks?.length;
  const subtasksCompleted = subtasks?.filter(
    (subtask) => subtask.iscompleted
  )?.length;

  return (
    <div
      onClick={() => {
        setModal("task-view");
        setModalData({
          columnId: columnId,
          taskId: id,
        });
      }}
      className="group rounded-lg bg-white dark:bg-[#2b2c37] px-4 py-5 min-h-[92px] cursor-pointer shadow-md shadow-[#40415823] hover:shadow-[#40415836] flex flex-col justify-center"
    >
      <h5 className="font-semibold group-hover:text-[#575FC6] text-black dark:text-white">
        {title}
      </h5>
      <p className="text-xs font-semibold text-gray-400 mt-1">
        {subtasks.length
          ? subtasksCompleted + " of " + subtasksLength + " subtasks"
          : ""}
      </p>
    </div>
  );
};

export default Task;
