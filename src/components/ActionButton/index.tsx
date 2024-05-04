import React from "react";

type Props = {
  children: React.ReactNode;
  bgColor?: string;
  color?: string;
  extraCSS?: string;
  disabled?: boolean;
  action: () => void;
  type?: "button" | "submit" | "reset";
};

const ActionButton = ({
  children,
  bgColor,
  color,
  extraCSS,
  disabled,
  type,
  action,
}: Props) => {
  return (
    <button
      type={type ? type : "submit"}
      className={`
      flex items-center gap-4 py-2 px-4 rounded-md  transition shadow-primary justify-center
      ${extraCSS && extraCSS}
      ${color ? color : "text-white"}
      ${
        disabled
          ? "cursor-not-allowed bg-gray-300 hover:bg-gray-400"
          : `${
              bgColor ? bgColor : "bg-primary-300 hover:bg-primary-400"
            } cursor-pointer`
      }
      `}
      onClick={() => action()}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ActionButton;
