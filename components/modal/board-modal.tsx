import { Board } from "@customTypes/data";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import IconCross from "public/assets/icon-cross";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TwitterPicker } from "react-color";

const BoardModal = () => {
  const newInputRef = useRef<HTMLInputElement>(null);
  const { setBoards, boards, currentBoard, setCurrentBoard } = useDataStore();
  const { setModal, modalData } = useModalStore();

  const isCreateBoard = modalData?.modalTitle === "Create Board";
  const boardId = modalData?.boardId;

  const highestBoardId = boards.length
    ? Math.max(...boards.map((board) => board.id))
    : 0;

  const [tempBoards, setTempBoards] = useState<Board[]>(boards);
  const [currentTempBoard, setCurrentTempBoard] = useState<Board | undefined>(
    isCreateBoard
      ? { columns: [], id: highestBoardId + 1 || 0, title: "New Board" }
      : boards.find((board) => board.id === modalData?.boardId) ||
          currentBoard ||
          undefined
  );

  console.log({ boardId, highestBoardId, tempBoards, currentTempBoard });

  const [showColorPicker, setShowColorPicker] = useState(-1);
  const colorPickerRef = useRef(null);

  useOnClickOutside(colorPickerRef, () => setShowColorPicker(-1));

  useEffect(() => {}, [currentTempBoard]);

  const removeColumn = (columnId: number) => {
    if (isCreateBoard) {
      setCurrentTempBoard({
        ...currentTempBoard,
        columns: currentTempBoard?.columns.filter(
          (column) => column.id !== columnId
        ),
      } as Board);
    }
    // if editing board
    else {
      const newBoards = tempBoards.map((board) => {
        if (board.id === currentBoard?.id) {
          return {
            ...board,
            columns: board.columns.filter((column) => column.id !== columnId),
          };
        }
        return board;
      });

      setCurrentTempBoard(
        newBoards.find((board) => board.id === currentTempBoard?.id)
      );
      setTempBoards(newBoards);
    }
  };

  const addColumn = () => {
    if (isCreateBoard) {
      const highestColumnId =
        currentTempBoard?.columns.reduce(
          (acc, column) => Math.max(acc, column.id),
          0
        ) || 0;

      setCurrentTempBoard({
        ...currentTempBoard,
        columns: [
          ...(currentTempBoard?.columns || []),
          {
            id: highestColumnId + 1,
            title: "New Column",
            tasks: [],
            color: "#5543ca",
          },
        ],
      } as Board);
    }
    // if editing board
    else {
      const newBoards = tempBoards.map((board) => {
        if (board.id === currentBoard?.id) {
          const highestColumnId =
            board.columns.reduce(
              (acc, column) => Math.max(acc, column.id),
              0
            ) || 0;
          console.log({ highestColumnId });

          return {
            ...board,
            columns: [
              ...board.columns,
              {
                id: highestColumnId + 1,
                title: "New Column",
                tasks: [],
                color: "#5543ca",
              },
            ],
          };
        }
        return board;
      });
      setTempBoards(newBoards);
      setCurrentTempBoard(
        newBoards.find((board) => board.id === currentBoard?.id)!
      );
    }
  };

  const handleSave = () => {
    if (isCreateBoard && currentTempBoard) {
      setBoards([...boards, currentTempBoard]);
    } else {
      setBoards(tempBoards);
    }
    setCurrentBoard(currentTempBoard as any);
    setModal(undefined);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1 my-4">
          <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">
            {isCreateBoard ? "Create Board" : "Edit Board"}
          </h2>
          <label
            htmlFor="board-title"
            className="text-sm text-gray-500 font-semibold dark:text-white"
          >
            Board name
          </label>
          <input
            type="text"
            name="board-title"
            id="board-title"
            className="bg-white dark:bg-[#2b2c37] rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm text-black dark:text-white"
            defaultValue={isCreateBoard ? "" : currentBoard?.title}
            onChange={(e) => {
              if (isCreateBoard) {
                console.log("aa");

                setCurrentTempBoard({
                  ...currentTempBoard,
                  title: e.target.value,
                } as Board);
              } else {
                const newBoards = boards.map((board) => {
                  if (board.id === currentBoard?.id) {
                    return {
                      ...board,
                      title: e.target.value,
                    };
                  }
                  return board;
                });
                setTempBoards(newBoards);
              }
            }}
          />
        </div>
        <label className="mt-4 text-sm font-semibold text-gray-500 dark:text-white">
          Columns
        </label>
        <div>
          {currentTempBoard?.columns.map((column, idx) => (
            <div key={idx} className="flex w-full mt-2">
              <input
                autoFocus={idx === currentTempBoard?.columns.length - 1}
                type="text"
                name="subtask-title"
                id="subtask-title"
                className="bg-white dark:bg-[#2b2c37] text-black dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 p-2 text-sm flex-1 w-full"
                defaultValue={column.title}
                onChange={(e) => {
                  console.log(currentTempBoard?.columns);

                  const newColumns = [...currentTempBoard?.columns];
                  newColumns[idx].title = e.target.value;
                  setTempBoards(
                    tempBoards.map((board) => {
                      if (board.id === currentBoard?.id) {
                        return {
                          ...board,
                          columns: newColumns,
                        };
                      }
                      return board;
                    })
                  );
                }}
              />
              <div className="flex justify-center items-center ml-4 cursor-pointer relative">
                <div
                  className="w-4 h-4 rounded-full "
                  style={{ backgroundColor: column.color }}
                  ref={colorPickerRef as any}
                  onClick={() =>
                    setShowColorPicker(showColorPicker === -1 ? idx : -1)
                  }
                ></div>
                {showColorPicker !== -1 && showColorPicker === idx && (
                  <div
                    className="absolute -right-[13px] top-8 z-30"
                    ref={colorPickerRef as any}
                  >
                    <TwitterPicker
                      triangle="top-right"
                      onChange={(color) =>
                        isCreateBoard
                          ? setCurrentTempBoard({
                              ...currentTempBoard,
                              columns: currentTempBoard?.columns.map(
                                (column, idx) => {
                                  if (idx === showColorPicker) {
                                    return {
                                      ...column,
                                      color: color.hex,
                                    };
                                  }
                                  return column;
                                }
                              ),
                            } as Board)
                          : setTempBoards(
                              tempBoards.map((board) => {
                                if (board.id === currentBoard?.id) {
                                  const newColumns = [
                                    ...currentTempBoard?.columns,
                                  ];
                                  newColumns[idx].color = color.hex;
                                  return {
                                    ...board,
                                    columns: newColumns,
                                  };
                                }
                                return board;
                              })
                            )
                      }
                      styles={{
                        default: {
                          card: {
                            backgroundColor: "#2B2C37",
                            border: "1px solid #22232E",
                            width: "280px",
                          },
                          triangle: {
                            display: "none",
                          },
                          input: {
                            height: "30px",
                            backgroundColor: "#2B2C37",
                          },
                        },
                      }}
                    ></TwitterPicker>
                  </div>
                )}
              </div>
              <div
                onClick={() => removeColumn(column.id)}
                className="flex justify-center items-center ml-4 cursor-pointer"
              >
                <IconCross />
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-100 rounded-full text-[#575FC6] py-2 text-sm font-semibold mt-4"
          type="button"
          onClick={() => addColumn()}
        >
          + Add new column
        </button>

        <div className="flex w-full gap-8 mt-6">
          <button
            className="bg-[#575FC6]  dark:text-white rounded-full py-2 text-sm font-semibold mt-2 flex-1"
            type="button"
            onClick={() => handleSave()}
          >
            Save Changes
          </button>
          <button
            className="bg-gray-100 dark:bg-white rounded-full text-[#575FC6] py-2 text-sm font-semibold mt-2 flex-1"
            type="button"
            onClick={() => setModal(undefined)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;
