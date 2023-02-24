import create from "zustand";
import { persist } from "zustand/middleware";
import { Board } from "@customTypes/data";
import { demoData } from "@utils/demo-data";

type DataStore = {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  currentBoard: Board | null;
  setCurrentBoard: (board: Board) => void;
};

export const useDataStore = create<DataStore>()(
  persist(
    (set, get) => ({
      boards: demoData.boards,
      setBoards: (boards) =>
        set({
          boards,
          currentBoard: boards.find(
            (board) => board.id === get().currentBoard?.id
          ),
        }),
      currentBoard: null,
      setCurrentBoard: (board) => set({ currentBoard: board }),
    }),
    { name: "kanban-data" }
  )
);
