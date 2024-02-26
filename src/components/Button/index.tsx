import React from "react";

type Props = {
  type: "submit" | "button";
  children: React.ReactNode;
  secondary?: boolean;
};

const Button = ({ type, children, secondary }: Props) => {
  return (
    <button
      type={type}
      className={`px-6 py-3 text-white rounded-md font-bold transition text-nowrap ${
        secondary
          ? "bg-secondary-300 hover:bg-secondary-400"
          : "bg-primary-300 hover:bg-primary-400"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
