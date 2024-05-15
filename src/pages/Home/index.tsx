import { ReactElement, useEffect, useState } from "react";
//Icons
import { IoShirtOutline } from "react-icons/io5";
import {
  MdOutlineCreditCard,
  MdOutlinePerson,
  MdOutlineShoppingBag,
} from "react-icons/md";

//Components
import Schedule from "../Schedule";
import Sellings from "../Sellings";
import CardSellings from "../../components/Card/CardSellings";

//Types
import { Sell } from "../../types/global.type";

//Service
import { findSellByDate } from "../../services/sell.service";
import { mainDiv } from "../../styles/div";

//Images
import welcomeBg from "../../assets/images/welcome-bg.png";
import { GrLineChart } from "react-icons/gr";
import ActionButton from "../../components/ActionButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [sellingsMonth, setSellingsMonth] = useState<Sell[]>([]);
  const [sellingsOnYear, setSellingsOnYear] = useState<Sell[]>([]);
  const [cardsData, setCardsData] = useState<
    {
      iconBgColor: string;
      title: string;
      value: string;
      icon: ReactElement;
    }[]
  >([]);

  const navigate = useNavigate();

  //Format date "YY-MM-DD"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const calcTotalRevenue = (sellings: Sell[]) => {
    let total = 0;

    sellings.forEach((item) => (total += item.total_price));
    return total.toFixed(2);
  };

  const calcAmountOfClothesSold = (sellings: Sell[]) => {
    let total = 0;

    sellings.forEach((item) => {
      item.items.forEach((itemSell) => {
        total += itemSell.amount;
      });
    });

    return total;
  };

  useEffect(() => {
    const getSellingsOnMonth = async () => {
      setSellingsMonth([]);
      try {
        const today = new Date();
        // Obtém o primeiro dia do mês atual
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );

        // Obtém o último dia do mês atual
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );

        const res = await findSellByDate(
          formatDate(firstDayOfMonth),
          formatDate(lastDayOfMonth)
        );
        if (res != null) {
          setSellingsMonth(res.data ? res.data : []);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSellingsOnMonth();

    if (sellingsMonth.length > 0) {
      setCardsData([
        {
          iconBgColor: "bg-blue-400",
          title: "Receita Total do Mês",
          value: `R$ ${calcTotalRevenue(sellingsMonth)}`,
          icon: <MdOutlineCreditCard />,
        },
        {
          iconBgColor: "bg-yellow-400",
          title: "Vendas no Mês",
          value: calcAmountOfClothesSold(sellingsMonth).toString(),
          icon: <MdOutlineShoppingBag />,
        },
        {
          iconBgColor: "bg-cyan-400",
          title: "Marca Mais Vendida",
          value: "Metta",
          icon: <IoShirtOutline />,
        },
        {
          iconBgColor: "bg-red-400",
          title: "Clientes Atendidos Hoje",
          value: "12",
          icon: <MdOutlinePerson />,
        },
      ]);
    }
  }, [sellingsMonth.length]);

  useEffect(() => {
    const getSellingsOnYear = async () => {
      setSellingsOnYear([]);
      try {
        const today = new Date();

        const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
        const lastDayOfYear = new Date(today.getFullYear(), 11, 31);

        const res = await findSellByDate(
          formatDate(firstDayOfYear),
          formatDate(lastDayOfYear)
        );

        if (res != null) {
          setSellingsOnYear(res.data ? res.data : []);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getSellingsOnYear();
  }, [sellingsOnYear.length]);

  return (
    <div className="mx-6 my-6 flex flex-col gap-12">
      <div className="grid md:grid-cols-4 xs:grid-cols-2 gap-4">
        {cardsData.map((item, key) => (
          <div
            className={`shadow-primary p-containerWBoxShadow rounded-lg flex gap-4 items-center`}
            key={key}
          >
            <div
              className={`rounded-lg text-white ${item.iconBgColor} w-[50px] h-[50px] text-2xl flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{item.value}</span>
              <span className="text-gray-800 text-sm">{item.title}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="md:grid md:grid-cols-5 gap-4 items-start">
        <div
          className={`${mainDiv} bg-primary-400 p-8 sm:pb-0 flex justify-between md:col-span-2 items-start text-white max-md:mb-12`}
        >
          <div>
            <div className="pb-4 flex max-xs:flex-col gap-4 items-center">
              <div className="rounded-lg bg-white p-4">
                <GrLineChart className="text-gray-600" />
              </div>
              <h3 className="font-medium text-lg">
                Bem vindo de volta ao Dashboard!
              </h3>
            </div>
            <div className="pb-4">
              <p className="pb-4">Confira seu emprendimento!</p>
              <div className="flex gap-4 max-sm:flex-col">
                <ActionButton
                  action={() => navigate("/analytics")}
                  bgColor="bg-secondary-300"
                  extraCSS="hover:bg-secondary-400"
                >
                  Análises
                </ActionButton>
                <ActionButton
                  action={() => navigate("/business")}
                  bgColor="bg-secondary-300"
                  extraCSS="hover:bg-secondary-400"
                >
                  Comércio
                </ActionButton>
              </div>
            </div>
          </div>
          <img src={welcomeBg} alt="Welcome image" className="w-auto h-auto sm:block hidden" />
        </div>
        <div className="col-span-3">
          <CardSellings chartRangeType="month" />
        </div>
      </div>
      <div className="max-md:flex max-md:flex-col md:grid md:grid-cols-2 gap-12 md:gap-4">
        <Schedule isAWidget />
        <Sellings isAWidget />
      </div>
    </div>
  );
};

export default Home;
