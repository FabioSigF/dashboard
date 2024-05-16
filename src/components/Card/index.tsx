import React from "react";
import { mainDiv } from "../../styles/div";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  headerRightChildren?: React.ReactNode;
};

const Card = ({ title, subtitle, children, headerRightChildren }: Props) => {
  return (
    <div className={`${mainDiv} flex flex-col gap-2 w-full bg-white`}>
      <div className="flex justify-between gap-8 items-start">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="text-xl font-medium cursor-pointer">{title}</h2>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        {headerRightChildren}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;
