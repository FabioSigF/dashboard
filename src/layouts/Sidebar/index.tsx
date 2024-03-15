import {
  MdCalendarMonth,
  MdInsertChartOutlined,
  MdOutlineDashboard,
  MdOutlinePhone,
  MdOutlineWarehouse,
} from "react-icons/md";
import Logo from "../../components/Logo";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../redux/store";

const Sidebar = () => {
  const { isOpen } = useAppSelector((state) => state.sidebar);

  const navItems = [
    {
      section: "Home",
      items: [
        {
          title: "Início",
          icon: <MdOutlineDashboard />,
          link: "",
        },
      ],
    },
    {
      section: "Apps",
      items: [
        {
          title: "Análises",
          icon: <MdInsertChartOutlined />,
          link: "/analytics",
        },
        {
          title: "Comércio",
          icon: <MdOutlineWarehouse />,
          link: "/business",
        },
        {
          title: "Agenda",
          icon: <MdCalendarMonth />,
          link: "/schedule",
        },
        {
          title: "Contatos",
          icon: <MdOutlinePhone />,
          link: "/contacts",
        },
      ],
    },
  ];

  const openedMenuStyles = "w-[280px]";
  const closedMenuStyles = "w-[80px]";
  return (
    <nav
      id="sidebar"
      className={`fixed left-0 top-0 bottom-0  h-full bg-white z-40 transition-all duration-300 overflow-x-hidden border-r ${
        isOpen ? openedMenuStyles : closedMenuStyles
      }`}
    >
      <div className="px-4 py-4">
        <div className={`h-[75px] flex items-center relative ${isOpen ? "w-full" : "w-[45px]"} overflow-x-hidden`}>
          <div className="absolute w-[280px]">
            <Logo />
          </div>
        </div>
        {navItems.map((section, key) => (
          <ul key={key} className="flex flex-col gap-4">
            <p className={`uppercase font-bold mt-8 text-xs transition-all ${isOpen ? "pl-0" : "pl-1"}`}>
              {section.section}
            </p>
            {section.items.map((item, key) => (
              <li key={key}>
                <NavLink
                  to={item.link}
                  className="flex gap-4 items-center px-2 py-[10px] relative before:hover:bg-gray-100 before:rounded-md before:bg-white before:w-full before:h-full before:absolute before:top-0 before:-left-[3px] before:transition"
                >
                  <span className="text-2xl relative">{item.icon}</span>
                  <p className={`font-medium relative text-nowrap ${isOpen ? "" : "text-white hidden"}`}>{item.title}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
