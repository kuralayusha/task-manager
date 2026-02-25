import { useModalStore } from "@store/modal";
import React, { useEffect, useRef } from "react";
import BoardModal from "./board-modal";
import TaskCreateModal from "./task-create-modal";
import TaskViewModal from "./task-view-modal";
import ReactDOM from "react-dom";
import { Board, Task } from "@customTypes/data";
import { useOnClickOutside } from "@utils/useOnClickOutside";
import ConfirmationModal from "./confirmation";

type ModalProps = {
  board: Board | null;
};

const Modal = ({ board }: ModalProps) => {
  const { modal, setModal, setModalData } = useModalStore();
  const [mounted, setMounted] = React.useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    setModal(undefined);
    setModalData(undefined);
  };

  const handleBackdropClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.target !== e.currentTarget) return;
    e.preventDefault();
    e.stopPropagation();
    closeModal();
  };

  useOnClickOutside(contentRef, closeModal);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted
    ? ReactDOM.createPortal(
        <div
          className="fixed top-0 left-0 w-full h-screen z-50 flex justify-center items-center"
          style={{
            background: "rgba(0,0,0,0.5)",
            display: modal ? "flex" : "none",
          }}
          onClick={handleBackdropClick}
          onTouchEnd={handleBackdropClick}
          onTouchEndCapture={(e) => {
            if (e.target !== e.currentTarget) return;
            e.preventDefault();
          }}
        >
          <div
            className="w-[480px] min-h-[250px] bg-white dark:bg-[#2b2c37] rounded-lg p-6 mx-2 sm:p-8"
            ref={contentRef}
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            {modal === "task-create" && <TaskCreateModal {...(board as any)} />}
            {modal === "task-view" && <TaskViewModal {...(board as any)} />}
            {modal === "board" && <BoardModal {...(board as any)} />}
            {modal === "confirmation" && (
              <ConfirmationModal {...(board as any)} />
            )}
          </div>
        </div>,
        document.getElementById("modal-root") as HTMLElement
      )
    : null;
};

export default Modal;
