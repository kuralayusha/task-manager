import React from "react";
import Image from "next/image";
import Switch from "./switch";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-center items-center max-h-[64px] py-3 flex-1 mx-4 gap-2 bg-[#F4F7FD]  dark:bg-[#22232E] rounded-lg">
      <Image
        src="/assets/icon-light-theme.svg"
        alt=""
        width={18}
        height={18}
        className="object-contain"
      ></Image>
      <Switch
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      ></Switch>
      <Image
        src="/assets/icon-dark-theme.svg"
        alt=""
        width={16}
        height={16}
        className="object-contain"
      ></Image>
    </div>
  );
};

export default ThemeSwitch;
