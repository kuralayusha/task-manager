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
      <>
        <Droppable droppableId="-1">
          {(provided) => (
            <div
              onClick={() => {
                setModal("board");
                if (!isCreateNewBoard) setModalData({ columnId: id });
                else setModalData({ modalTitle: "Create Board" });
              }}
              className={`h-full min-h-[500px] mt-8 overflow-x-visible bg-[#EAEFFA] dark:bg-[#22232E] flex justify-center items-center cursor-pointer rounded-lg ${
                !isCreateNewBoard
                  ? "w-[240px] min-w-[240px] md:w-[280px] md:min-w-[280px]"
                  : "w-full"
              }`}
              ref={provided.innerRef}
            >
              <span className="text-gray-400 text-lg font-semibold">
                {title}
              </span>
            </div>
          )}
        </Droppable>
      </>
    );
  return (
    <div className="h-full min-h-[200px] min-w-[240px] w-[240px] md:min-w-[280px] md:w-[280px] overflow-x-visible">
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
            {tasks?.length ? (
              tasks.map((task, index) => (
                <li key={task.id}>
                  <Task {...task} index={index} columnId={id}></Task>
                </li>
              ))
            ) : (
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setModal("task-create");
                    setModalData({ columnId: id });
                  }}
                  className="w-full min-h-[120px] mt-2 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 bg-[#EAEFFA]/50 dark:bg-[#22232E]/50 hover:bg-[#EAEFFA] dark:hover:bg-[#22232E] hover:border-[#575FC6] dark:hover:border-[#575FC6] transition-colors flex flex-col items-center justify-center gap-1.5 py-4 px-3 cursor-pointer group"
                >
                  <span className="text-[#575FC6] font-semibold text-sm group-hover:underline">
                    + New Task
                  </span>
                  <span className="text-gray-400 dark:text-gray-500 text-xs">
                    or drag and drop a task
                  </span>
                </button>
              </li>
            )}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
};

export default BoardColumn;
