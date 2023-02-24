import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import React from "react";

const ConfirmationModal = () => {
  const { modalData, setModal } = useModalStore();
  const { boards, setBoards, setCurrentBoard, currentBoard } = useDataStore();
  console.log({ modalData });

  const handleConfirm = () => {
    console.log(modalData?.boardId);
    console.log(currentBoard?.id);

    if (typeof modalData?.boardId === "number") {
      console.log("delete board");

      const newBoards = boards.filter(
        (board) => board.id !== modalData?.boardId
      );
      setBoards(newBoards);
      setCurrentBoard(newBoards[0]);
      setModal(undefined);
    }

    if (typeof modalData?.columnId === "number") {
      console.log("delete column");

      const newBoards = boards.map((board) => {
        if (board.id === currentBoard?.id) {
          return {
            ...board,
            columns: board.columns.filter(
              (column) => column.id !== modalData?.columnId
            ),
          };
        }
        return board;
      });
      setBoards(newBoards);
      setModal(undefined);
    }

    if (typeof modalData?.taskId === "number") {
      console.log("delete task");

      const newBoards = boards.map((board) => {
        if (board.id === currentBoard?.id) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              return {
                ...column,
                tasks: column.tasks.filter(
                  (task) => task.id !== modalData?.taskId
                ),
              };
            }),
          };
        }
        return board;
      });
      setBoards(newBoards);
      setModal(undefined);
    }
  };

  return (
    <div>
      <h3 className="text-red-400 text-xl font-bold">
        {modalData?.modalTitle}
      </h3>
      <p className="text-gray-400 text-sm mt-8">
        {modalData?.modalDescription}
      </p>
      <div className="flex justify-between">
        <button
          className="bg-red-400 hover:bg-red-500 flex-1 font-semibold text-sm text-black dark:text-white px-4 py-2 rounded-full mt-8"
          onClick={() => handleConfirm()}
        >
          Delete
        </button>
        <button
          onClick={() => setModal(undefined)}
          className="bg-white hover:bg-gray-100 flex-1 font-semibold text-sm text-[#5543ca] px-4 py-2 rounded-full mt-8 ml-4"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
