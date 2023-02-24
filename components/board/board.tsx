import Modal from "@components/modal";
import { useDataStore } from "@store/data";
import { useModalStore } from "@store/modal";
import { demoData } from "@utils/demo-data";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import BoardColumn from "./column";

const Board = () => {
  const { boards, setBoards, currentBoard, setCurrentBoard } = useDataStore();
  const { modal, setModal } = useModalStore();

  useEffect(() => {
    if (boards.length > 0 && !currentBoard) {
      setCurrentBoard(boards[0]);
    } else {
      // setBoards(demoData.boards);
    }
  }, [boards, currentBoard]);

  const selectedBoardIndex = boards.findIndex(
    (board) => board.title === currentBoard?.title
  );

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    console.log("destination: ", destination);
    console.log("source: ", source);

    if (!destination || !source) {
      return;
    }

    if (destination.droppableId === "-1") {
      setModal("board");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = boards[selectedBoardIndex].columns.find(
      (column) => column.id.toString() === source.droppableId
    );
    const finish = boards[selectedBoardIndex].columns.find(
      (column) => column.id.toString() === destination.droppableId
    );

    if (start === finish && start) {
      const newTaskIds = Array.from(start.tasks);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, start.tasks[source.index]);

      const newColumn = {
        ...start,
        tasks: newTaskIds,
      };

      const newState = {
        ...boards[selectedBoardIndex],
        columns: boards[selectedBoardIndex].columns.map((column) =>
          column.title === newColumn.title ? newColumn : column
        ),
      };

      setBoards(
        boards.map((board) =>
          board.title === newState.title ? newState : board
        )
      );
      return;
    }

    // Moving from one list to another
    if (start && finish) {
      const startTaskIds = Array.from(start.tasks);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.tasks);
      finishTaskIds.splice(destination.index, 0, start.tasks[source.index]);
      const newFinish = {
        ...finish,
        tasks: finishTaskIds,
      };

      const newState = {
        ...boards[selectedBoardIndex],
        columns: boards[selectedBoardIndex].columns.map((column) =>
          column.title === newStart.title
            ? newStart
            : column.title === newFinish.title
            ? newFinish
            : column
        ),
      };

      setBoards(
        boards.map((board) =>
          board.title === newState.title ? newState : board
        )
      );
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-6">
        {boards[selectedBoardIndex]?.columns.map((column, index) => (
          <BoardColumn
            index={index}
            tasks={column.tasks}
            title={column.title}
            key={column.id}
            id={column.id}
            color={column.color}
          />
        ))}
        <BoardColumn
          title={boards.length > 0 ? "+ New Column" : "Create New Board"}
          newColumn
        />
      </div>
      <Modal board={currentBoard}></Modal>
    </DragDropContext>
  );
};

export default Board;
