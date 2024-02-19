import { Dispatch, SetStateAction } from "react";

type Props = {
  title: string;
  type: "text"|"email"|"password"|"submit";
  id: string;
  setValue: Dispatch<SetStateAction<string>>;
};

const Input = ({ title, type, id, setValue }: Props) => {
  return (
    <div className="inputStyle relative flex items-center w-full">
      <input
        type={type}
        name={id}
        id={id}
        placeholder="Nome"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="min-h-[56px] h-full border rounded-sm border-gray-300 px-3 pt-3 placeholder:hidden placeholder:text-transparent placeholder:text-black-600-p w-full"
      />
      <label
        htmlFor={id}
        className="absolute left-[1rem] text-black-600-p transition-all bg-white px-2"
      >
        {title}
      </label>
    </div>
  );
};

export default Input;
