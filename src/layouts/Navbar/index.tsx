import {
  MdMenu,
  MdNotificationsNone,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { useAppDispatch } from "../../redux/store";
import { onToggle } from "../../redux/sidebar/slice";
import { useEffect, useState } from "react";

const Navbar = () => {
  const dispatch = useAppDispatch();

  const iconWrapperStyle =
    "p-2 rounded-full bg-transparent hover:bg-gray-100 cursor-pointer transition";

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 80) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      id="navbar"
      className={`sticky top-0 left-0 w-full h-[80px] z-30 bg-white transition ${hasShadow ? "shadow-primary" : "shadow-none"}`} 
    >
      <div className="px-4 w-full flex justify-between items-center h-full">
        <div
          className={`${iconWrapperStyle}`}
          onClick={() => dispatch(onToggle())}
        >
          <MdMenu className="text-2xl" />
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
