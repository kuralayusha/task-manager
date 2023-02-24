import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Board from "@components/board/board";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Modal from "@components/modal";

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [_, render] = useState(0);
  const container = useRef<HTMLDivElement>(null);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    console.log("w: ", container?.current?.clientWidth);
  }, []);

  return (
    <div className="w-full h-screen">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      ></Header>
      <div
        className="flex items-center bg-[#EAEFFA] dark:bg-[#20212C]"
        style={{
          width: "100%",
        }}
        ref={container}
      >
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></Sidebar>
        {showSidebar && (
          <div
            className="overlay mobile absolute z-10 left-0 w-full h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)]"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            onClick={() => setShowSidebar(false)}
          ></div>
        )}
        <main
          className={`transition bg-[#F4F7FD] dark:bg-[#20212C] overflow-scroll  p-6 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] ${
            !showSidebar && !isMobile ? "-translate-x-[280px]" : "w-full"
          }`}
          style={{
            width: showSidebar
              ? "100%"
              : `calc(${container?.current?.clientWidth}px + 280px)`,
          }}
        >
          {<Board></Board>}
        </main>
        <div id="modal-root"></div>
      </div>
    </div>
  );
};

export default Index;
