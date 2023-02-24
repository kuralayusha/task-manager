import { useTheme } from "next-themes";
import React from "react";

type SwitchProps = {
  label?: string;
  onChange?: () => void;
};

const Switch = ({ label, onChange }: SwitchProps) => {
  const { theme } = useTheme();
  return (
    <label className="inline-flex relative items-center cursor-pointer">
      <input
        type="checkbox"
        value=""
        className="sr-only peer"
        defaultChecked={theme === "dark"}
        onChange={onChange}
      />
      <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-5 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-[#575FC6]"></div>
      <span
        className={`text-sm font-medium text-gray-900 dark:text-gray-300 ${
          label ? "ml-4" : ""
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default Switch;
