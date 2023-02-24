import { Board, Column, SubTask, Task } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import IconCross from "public/assets/icon-cross";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

type Props = {} & Board;

const TaskCreateModal = ({ id, title, columns }: Props) => {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const { boards, setBoards, currentBoard } = useDataStore();
  const { setModal, modalData } = useModalStore();

  const isCreateTask = modalData?.modalTitle !== "Edit Task";
  const currentTask = columns
    .find((column) => column.id === modalData?.columnId)
    ?.tasks.find((task) => task.id === modalData?.taskId);

  const [subtaskInput, setSubtaskInput] = useState<string>("");
  const [subtasks, setSubtasks] = useState<SubTask[]>(
    currentTask?.subtasks || []
  );
  const [taskTitle, setTaskTitle] = useState<string>(currentTask?.title || "");
  const [taskDescription, setTaskDescription] = useState<string>(
    currentTask?.description || ""
  );
  const [taskColumn, setTaskColumn] = useState<Column | undefined>(
    columns.find((column) => column.id === modalData?.columnId) || columns[0]
  );

  console.log({ modalData, currentTask });

  const addSubtask = () => {
    if (subtaskInput) {
      const id = subtasks.length;
      setSubtaskInput("");
      setSubtasks([
        ...subtasks,
        { title: subtaskInput, id, iscompleted: false },
      ]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollTop =
          scrollContainer.current.scrollHeight;
      }
    }, 1);
    return () => clearInterval(interval);
  }, [subtasks]);

  const removeSubtask = (id: number) => {
    setSubtasks(subtasks.filter((subtask) => subtask.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(taskTitle, taskColumn);
    console.log(isCreateTask);

    if (!taskTitle || !taskColumn) return;

    if (isCreateTask) {
      // get the highest task id in the columns
      let highestTaskId = 0;
      columns.forEach((column) => {
        column.tasks.forEach((task) => {
          if (task.id > highestTaskId) {
            highestTaskId = task.id;
          }
        });
      });

      const newTask: Task = {
        id: highestTaskId + 1,
        title: taskTitle,
        description: taskDescription,
        subtasks,
      };

      const newColumns = columns.map((column) => {
        if (column.title === taskColumn.title) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      });

      const newBoards = boards.map((board) => {
        if (board.id === id) {
          return {
            ...board,
            columns: newColumns,
          };
        }
        return board;
      });

      setBoards(newBoards);
      setModal(undefined);
    } else {
      // edit task considering a column change
      const prevTaskColumn = columns.find(
        (column) => column.id === modalData?.columnId
      );
      const newTaskColumn = taskColumn;

      console.log({ prevTaskColumn, newTaskColumn });

      let newBoards;

      if (newTaskColumn !== prevTaskColumn) {
        newBoards = boards.map((board) => {
          if (board.id === id) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.id === prevTaskColumn?.id) {
                  return {
                    ...column,
                    tasks: column.tasks.filter(
                      (task) => task.id !== currentTask?.id
                    ),
                  };
                } else if (column.id === newTaskColumn?.id) {
                  return {
                    ...column,
                    tasks: [
                      ...column.tasks,
                      {
                        ...currentTask,
                        title: taskTitle,
                        description: taskDescription,
                        subtasks,
                      },
                    ],
                  };
                }
                return column;
              }),
            };
          }
          return board;
        });
      } else {
        newBoards = boards.map((board) => {
          if (board.id === id) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.id === newTaskColumn?.id) {
                  return {
                    ...column,
                    tasks: column.tasks.map((task) => {
                      if (task.id === currentTask?.id) {
                        return {
                          ...task,
                          title: taskTitle,
                          description: taskDescription,
                          subtasks,
                          id: task.id,
                        };
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
      }

      setBoards(newBoards as any);
      setModal(undefined);
    }
  };

  useEffect(() => {
    console.log(subtasks);
  }, [subtasks]);

  return (
    <form
      onSubmit={handleSubmit}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <h4 className="font-semibold text-lg text-black dark:text-white">
        {isCreateTask ? "Create Task" : "Edit Task"}
      </h4>
      <div className="flex flex-col gap-1 my-4">
        <label
          htmlFor="task-title"
          className="text-xs font-semibold text-gray-400 dark:text-white"
        >
          Title
        </label>
        <input
          required={true}
          type="text"
          name="task-title"
          id="task-title"
          className="bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm"
          onChange={(e) => setTaskTitle(e.target.value)}
          defaultValue={currentTask?.title || ""}
        />
      </div>
      <div className="flex flex-col gap-1 my-4">
        <label
          htmlFor="description"
          className="text-xs font-semibold text-gray-400 dark:text-white"
        >
          Description
        </label>
        <textarea
          name="description"
          id="description"
          className="bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm resize-none h-20"
          placeholder="e.g Study for exam tomorrow"
          onChange={(e) => setTaskDescription(e.target.value)}
          defaultValue={currentTask?.description || ""}
        />
      </div>
      <div className="flex flex-col gap-1 my-4">
        <label
          htmlFor="subtask-title"
          className="text-xs font-semibold text-gray-400 dark:text-white"
        >
          Subtask
        </label>
        <div className="flex flex-col">
          <div
            ref={scrollContainer}
            className="max-h-[140px] overflow-y-scroll"
          >
            {subtasks.map((subtask, idx) => (
              <div key={idx} className="flex w-full mt-2">
                <input
                  type="text"
                  name="subtask-title"
                  id="subtask-title"
                  className="bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm flex-1 w-full"
                  defaultValue={subtask.title}
                  onChange={(e) => {
                    const newSubtasks = [...subtasks];
                    newSubtasks[idx].title = e.target.value;
                    setSubtasks(newSubtasks);
                  }}
                />
                <div
                  onClick={() => removeSubtask(subtask.id)}
                  className="flex justify-center items-center ml-4 cursor-pointer"
                >
                  <IconCross />
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full mt-2">
            <input
              type="text"
              name="subtask-title"
              id="subtask-title"
              className="bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm flex-1 w-full"
              placeholder="e.g Set a timer"
              value={subtaskInput}
              onChange={(e) => setSubtaskInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addSubtask();
                }
              }}
            />
            {/* <div>close</div> */}
          </div>
        </div>
        <button
          className="bg-gray-100 dark:bg-white text-[#575FC6] rounded-full py-2 text-sm font-semibold mt-2"
          type="button"
          onClick={() => addSubtask()}
        >
          + Add new subtask
        </button>

        <div className="flex flex-col gap-1 my-4">
          <label htmlFor="column-title" className="text-sm">
            Status
          </label>
          <select
            className="bg-white dark:bg-[#2b2c37] border border-gray-200 dark:border-gray-700 p-2 text-sm rounded-lg text-black dark:text-white"
            name="column-title"
            onChange={(e) => {
              setTaskColumn(
                columns.find(
                  (column) =>
                    column.title ===
                    e.currentTarget.options[e.currentTarget.selectedIndex].text
                ) as Column
              );
            }}
          >
            {columns.map((column, idx) => (
              <option
                key={column.id}
                value={column.id}
                selected={taskColumn?.id === column.id}
              >
                {column.title}
              </option>
            ))}
          </select>
        </div>

        <button
          className="bg-[#575FC6] text-white rounded-full py-2 text-sm font-semibold mt-4"
          type="submit"
        >
          {isCreateTask ? "Create Task" : "Edit Task"}
        </button>
      </div>
    </form>
  );
};

export default TaskCreateModal;
