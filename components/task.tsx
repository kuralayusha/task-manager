import { Board, Task as TaskType } from "@customTypes/data";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { useModalStore } from "@store/modal";
import Modal from "./modal";
import { useDataStore } from "@store/data";

type TaskProps = { index: number; columnId?: number } & TaskType;

const Task = ({ title, index, subtasks, id, columnId }: TaskProps) => {
  const { setModal, setModalData } = useModalStore();
  const { currentBoard } = useDataStore();

  const subtasksLength = subtasks?.length;
  const subtasksCompleted = subtasks?.filter(
    (subtask) => subtask.iscompleted
  )?.length;

  return (
    <Draggable draggableId={id.toString()} index={index}>
      {(provided) => (
        <div
          onClick={() => {
            setModal("task-view");
            setModalData({
              columnId: columnId,
              taskId: id,
            });
          }}
          className="group rounded-lg bg-white dark:bg-[#2b2c37] px-4 py-5 min-h-[92px] cursor-pointer shadow-md shadow-[#40415823] hover:shadow-[#40415836] flex flex-col justify-center"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
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
      )}
    </Draggable>
  );
};

export default Task;
