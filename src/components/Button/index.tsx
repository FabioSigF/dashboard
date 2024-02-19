import React from "react";

type Props = {
  type: "submit" | "button";
  children: React.ReactNode;
};

const Button = ({ type, children }: Props) => {
  return (
    <button
      type={type}
      className="px-4 py-3 text-white bg-primary-300 hover:bg-primary-400 rounded-sm text-base font-bold transition"
    >
      {children}
    </button>
  );
};

export default Button;
