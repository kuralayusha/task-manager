import { Board, Column, SubTask, Task } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import Image from "next/image";
import IconEdit from "public/assets/icon-edit";
import IconTrashCan from "public/assets/icon-trash-can";
import React, { useCallback, useMemo, useRef, useState } from "react";

type Props = {} & Board;

const TaskCreateModal = (board: Props) => {
  const { boards, setBoards, currentBoard, setCurrentBoard } = useDataStore();
  const { setModal, modalData, setModalData } = useModalStore();
  const [showMore, setShowMore] = useState(false);
  const showMoreRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(showMoreRef, () => setShowMore(false));

  const currentColumn = currentBoard?.columns.find(
    (column) => column.id === modalData?.columnId
  );

  const currentTask = currentBoard?.columns
    .find((column) => column.id === modalData?.columnId)
    ?.tasks.find((task) => task.id === modalData?.taskId);

  const completedSubtasks = currentTask?.subtasks.filter(
    (subtask) => subtask.iscompleted
  );

  const handleTaskRemove = () => {
    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            return {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== currentTask?.id),
            };
          }),
        };
      }
      return board;
    });
    setBoards(newBoards);
    setModal(undefined);
  };

  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sourceColumn = currentBoard?.columns.find((column) =>
      column.tasks.some((task) => task.id === currentTask?.id)
    );
    const destinationColumn = currentBoard?.columns.find(
      (column) =>
        column.title ===
        e.currentTarget.options[e.currentTarget.selectedIndex].text
    );

    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id === sourceColumn?.id) {
              return {
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.id !== currentTask?.id
                ),
              };
            }
            if (column.id === destinationColumn?.id) {
              return {
                ...column,
                tasks: [...column.tasks, currentTask!],
              };
            }
            return column;
          }),
        };
      }
      return board;
    });

    setBoards(newBoards);
    setCurrentBoard(newBoards.find((board) => board.id === currentBoard?.id)!);
    setModal(undefined);
  };

  const handleCheckboxChange = (checked: boolean, subtask: SubTask) => {
    console.log({ checked, subtask });

    const newSubtasks = currentTask?.subtasks.map((st) => {
      if (st.id === subtask.id) {
        return { ...st, iscompleted: checked };
      }
      return st;
    });

    console.log({ newSubtasks });

    const newBoards = boards.map((board) => {
      if (board.id === currentBoard?.id) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.tasks.some((task) => task.id === currentTask?.id)) {
              return {
                ...column,
                tasks: column.tasks.map((task) => {
                  if (task.id === currentTask?.id) {
                    return { ...task, subtasks: newSubtasks };
                  }
                  return task;
                }),
              };
            }
            return column;
          }),
        };
      }
      return board;
    });

    setBoards(newBoards as Board[]);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="w-full flex justify-between">
        <h4 className="font-semibold text-lg text-black dark:text-white">
          {currentTask?.title}
        </h4>
        <div className="group relative">
          <div
            className="flex items-center justify-center w-4 cursor-pointer"
            onClick={() => setShowMore(!showMore)}
          >
            <Image
              src="/assets/icon-vertical-ellipsis.svg"
              width={4}
              height={24}
              alt="more options"
            />
          </div>
          {showMore && (
            <div
              ref={showMoreRef}
              className="absolute right-0 p-4 flex flex-col w-36  bg-[#2B2C37] border border-gray-100 dark:border-gray-800 shadow rounded-lg"
            >
              <div
                className="text-sm text-gray-400 dark:text-white flex cursor-pointer items-center"
                onClick={() => {
                  setModal("task-create");
                  setModalData({
                    modalTitle: "Edit Task",
                    taskId: currentTask?.id,
                    columnId: currentColumn?.id,
                  });
                }}
              >
                {/* <IconEdit className="fill-black dark:fill-white cursor-pointer w-5 h-5" /> */}
                Edit Task
              </div>
              <div
                className="text-sm text-red-500 flex items-center cursor-pointer mt-4"
                onClick={() => {
                  setModal("confirmation");
                  setModalData({
                    modalTitle: "Delete Task",
                    modalDescription:
                      "Are you sureyou want to delete this task?",
                    taskId: currentTask?.id,
                  });
                }}
              >
                Delete Task
                {/* <IconTrashCan className="fill-black dark:fill-white cursor-pointer"></IconTrashCan> */}
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">{currentTask?.description}</p>
      {currentTask?.subtasks && (
        <div className="flex flex-col gap-1 my-4">
          <label
            htmlFor="subtask-title"
            className="text-xs font-semibold text-gray-400 dark:text-white flex items-center gap-2"
          >
            {`Subtasks (${completedSubtasks?.length} of ${currentTask?.subtasks.length})`}
          </label>
          <div className="flex flex-col max-h-[300px] overflow-y-scroll">
            {currentTask?.subtasks.map((subtask, idx) => (
              <div key={idx} className="flex w-full mt-2">
                <div className="flex items-center w-full">
                  <label
                    htmlFor={`cb-${idx}`}
                    className="text-sm font-medium bg-gray-100 dark:bg-gray-700 p-2 rounded-lg outline-none focus:outline-none text-gray-900 dark:text-gray-300 flex items-center flex-1 w-full"
                  >
                    <input
                      autoFocus={idx === 0}
                      id={`cb-${idx}`}
                      type="checkbox"
                      defaultChecked={subtask.iscompleted}
                      onChange={(e) =>
                        handleCheckboxChange(e.currentTarget.checked, subtask)
                      }
                      className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      // change state when enter hit
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleCheckboxChange(
                            e.currentTarget.checked,
                            subtask
                          );
                          e.currentTarget.checked = !e.currentTarget.checked;
                        }
                      }}
                    />
                    <span
                      className={`ml-4 text-gray-600 dark:text-gray-200 ${
                        subtask.iscompleted ? "line-through" : ""
                      }`}
                    >
                      {subtask.title}
                    </span>
                  </label>
                </div>
              </div>
            ))}
          </div>
          <h5 className="text-xs font-semibold text-gray-400 dark:text-white flex items-center gap-2 mt-4">
            Current status
          </h5>
          <select
            className="bg-white dark:bg-[#2b2c37] border border-gray-200 dark:border-gray-700 p-2 text-sm rounded-lg text-black dark:text-white"
            onChange={handleColumnChange}
            // disabled
          >
            {board.columns.map((column) => (
              <option
                key={column.id}
                value={column.id}
                selected={column.tasks.some(
                  (task) => task.id === currentTask?.id
                )}
              >
                {column.title}
              </option>
            ))}
          </select>
        </div>
      )}
    </form>
  );
};

export default TaskCreateModal;
