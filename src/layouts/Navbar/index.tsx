import React from "react";
import {
  MdMenu,
  MdNotificationsNone,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { useAppDispatch } from "../../redux/store";
import { onToggle } from "../../redux/sidebar/slice";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const iconWrapperStyle =
    "p-2 rounded-full bg-transparent hover:bg-gray-100 cursor-pointer transition";
  return (
    <nav id="navbar" className="sticky top-0 left-0 w-full h-[80px] z-30">
      <div className="px-4 w-full flex justify-between items-center h-full">
        <div className={`${iconWrapperStyle}`}>
          <MdMenu className="text-2xl" onClick={() => dispatch(onToggle())} />
        </div>

        <ul className="flex gap-4">
          <li className={`${iconWrapperStyle}`}>
            <MdNotificationsNone className={`text-2xl`} />
          </li>
          <li className={`${iconWrapperStyle}`}>
            <MdPersonOutline className={`text-2xl`} />
          </li>
          <li className={`${iconWrapperStyle}`}>
            <MdOutlineSettings className={`text-2xl`} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
