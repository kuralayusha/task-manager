import { useDataStore } from "@store/data";
import React, { useState } from "react";
import Nav from "./nav";
import { useTheme } from "next-themes";
import Switch from "./switch";
import Image from "next/image";
import ThemeSwitch from "./theme-switch";
import IconShowSidebar from "public/assets/icon-show-sidebar";

type SidebarProps = {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sidebar = ({ showSidebar, setShowSidebar }: SidebarProps) => {
  const { boards, currentBoard, setCurrentBoard } = useDataStore();
  const { theme, setTheme } = useTheme();
  return (
    <div className={`flex desktop transition `}>
      <div
        className={`bg-white dark:bg-[#2b2c37] z-20 dark:bg-dark-gray h-[calc(100vh-64px)] sm:h-[calc(100vh-80px)] lg:h-[calc(100vh-96px)] w-[280px] pt-8 flex flex-col justify-between transition  ${
          showSidebar ? "" : "-translate-x-full"
        }`}
      >
        <Nav />

        <ThemeSwitch></ThemeSwitch>

        <div
          className="flex items-center group hover:bg-white font-semibold px-2 py-3 pl-6 w-full rounded-r-full cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Image
            src="/assets/icon-hide-sidebar.svg"
            width={18}
            height={18}
            alt="hide sidebar"
            className="object-contain mr-3"
          ></Image>
          <span className="text-gray-400 group-hover:text-[#575FC6] ">
            Hide Sidebar
          </span>
        </div>
      </div>
      <div className="desktop z-10 fixed bottom-4">
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-14 h-12 rounded-r-full cursor-pointer bg-[#565FC5] relative flex justify-center items-center"
        >
          <IconShowSidebar className={`fill-white`}></IconShowSidebar>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
