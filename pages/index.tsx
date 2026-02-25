import Sidebar from "@components/sidebar";
import Header from "@components/header";
import Board from "@components/board/board";
import { ClientOnly } from "@components/client-only";
import React, { useState } from "react";
import { useEffect } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Modal from "@components/modal";

const MOBILE_BREAKPOINT = 768;

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT;

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.innerWidth >= MOBILE_BREAKPOINT
    ) {
      setShowSidebar(true);
    }
  }, []);

  return (
    <ClientOnly>
      <div className="w-full h-screen">
        <Header
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        ></Header>
        <div
          className="flex items-center bg-[#F4F7FD] dark:bg-[#20212C]"
          style={{
            width: "100%",
          }}
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
            className="flex-1 min-w-0 transition bg-[#F4F7FD] dark:bg-[#20212C] overflow-scroll p-6 h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)]"
          >
            {<Board></Board>}
          </main>
          <div id="modal-root"></div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default Index;
