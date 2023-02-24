import Task from "@components/task";
import { Task as TaskType } from "@customTypes/data";
import { useModalStore } from "@store/modal";
import React from "react";
import { Droppable } from "react-beautiful-dnd";

type BoardColumnProps = {
  index?: number;
  tasks?: TaskType[];
  title?: string;
  id?: number;
  color?: string;
  newColumn?: boolean;
};

const BoardColumn = ({
  tasks,
  title,
  id,
  newColumn,
  color,
}: BoardColumnProps) => {
  const { setModal, setModalData } = useModalStore();
  const isCreateNewBoard = title === "Create New Board";
  if (newColumn)
    return (
      <Droppable droppableId="-1">
        {(provided) => (
          <div
            onClick={() => {
              setModal("board");
              if (!isCreateNewBoard) setModalData({ columnId: id });
              else setModalData({ modalTitle: "Create Board" });
            }}
            className="h-full min-h-[500px] mt-9 overflow-x-visible bg-[#EAEFFA] dark:bg-[#22232E] flex justify-center items-center cursor-pointer rounded-lg"
            ref={provided.innerRef}
            style={
              !isCreateNewBoard
                ? { width: "280px", minWidth: "280px" }
                : { width: "100%" }
            }
          >
            <span className="text-gray-400 text-lg font-semibold">{title}</span>
          </div>
        )}
      </Droppable>
    );
  return (
    <div className="h-full min-h-[200px] min-w-[280px] w-[280px] overflow-x-visible">
      {title && (
        <div className="flex items-center mb-4">
          <div
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-xs tracking-widest uppercase ml-2 text-gray-400 font-semibold">
            {title + " (" + tasks?.length + ")"}
          </span>
        </div>
      )}
      <Droppable droppableId={id?.toString() || "empty"}>
        {(provided) => (
          <ul
            className="flex flex-col gap-4 min-h-[300px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks?.map((task, index) => (
              <li key={task.id}>
                <Task {...task} index={index} columnId={id}></Task>
              </li>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
