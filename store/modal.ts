import { Task } from "@customTypes/data";
import zustand from "zustand";

type ModalTypes =
  | "task-create"
  | "task-view"
  | "board"
  | "confirmation"
  | undefined;

type ModalData = {
  taskId?: number;
  boardId?: number;
  columnId?: number;
  modalTitle?: string;
  modalDescription?: string;
};

type ModalStore = {
  modal: ModalTypes;
  setModal: (modal: ModalTypes) => void;
  modalData: ModalData | undefined;
  setModalData: (data: ModalData | undefined) => void;
};

export const useModalStore = zustand<ModalStore>((set) => ({
  modal: undefined,
  setModal: (modal) => set({ modal }),
  modalData: undefined,
  setModalData: (data) => set({ modalData: data }),
}));
