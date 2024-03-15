import React from "react";

type Props = {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
  extraCSS?: string;
};

const ActionButton = ({ children, bgColor, color, extraCSS }: Props) => {
  return (
    <button
      type="submit"
      className={`flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer transition text-sm shadow-primary
      ${color ? color : "text-white"}
      ${bgColor ? bgColor : "bg-primary-300 hover:bg-primary-400"}
      ${extraCSS && extraCSS}
      `}
    >
      {children}
    </button>
  );
};

export default ActionButton;
