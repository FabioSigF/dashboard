//React
import { useEffect, useState } from "react";

//Type
import { Sell } from "../../../types/global.type";

//Component
import Card from "..";
import ChartSellings from "../../Charts/ChartSellings";

//Service
import {
  findSellByDate,
  findSellingsByCompanyAndDate,
} from "../../../services/sell.service";

//Icon
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoShirtOutline } from "react-icons/io5";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ActionButton from "../../ActionButton";
import { useAppDispatch } from "../../../redux/store";
import { onOpen } from "../../../redux/salesReportModal/slice";

type Props = {
  company_id?: string;
  chartRangeDate?: string;
  chartRangeType: "week" | "month" | "year" | "allTime";
};

const CardSellings = ({
  company_id,
  chartRangeDate,
  chartRangeType,
}: Props) => {
  const [sellings, setSellings] = useState<Sell[]>([]);
  const dispatch = useAppDispatch();

  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth + 1);

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const selectableYears = [currentYear, currentYear - 1, currentYear - 2];

  //Format date "YY-MM-DD"
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  //Get Sellings in Current Month
  const getSellingsOnMonth = async () => {
    setSellings([]);
    try {
      const today = new Date(`${selectedYear}-${selectedMonth}-01`);
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

      if (company_id) {
        const res = await findSellingsByCompanyAndDate(
          company_id,
          formatDate(firstDayOfMonth),
          formatDate(lastDayOfMonth)
        );
        if (res != null) {
          console.log(res.data);
          setSellings(res.data ? res.data : []);
        }
      } else {
        const res = await findSellByDate(
          formatDate(firstDayOfMonth),
          formatDate(lastDayOfMonth)
        );
        if (res != null) {
          setSellings(res.data ? res.data : []);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get Sellings in Current Week
  const getSellingsOnWeek = async () => {
    setSellings([]);
    try {
      let today;
      if (chartRangeDate) {
        today = new Date(chartRangeDate);
      } else {
        today = new Date();
      }
      const firstDayOfWeek = new Date(today);
      const lastDayOfWeek = new Date(today);

      // Primeiro dia da semana (Domingo)
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const formattedFirstDayOfWeek = formatDate(firstDayOfWeek);

      // Último dia da semana (Sábado)
      lastDayOfWeek.setDate(today.getDate() - today.getDay() + 6);
      const formattedLastDayOfWeek = formatDate(lastDayOfWeek);

      if (company_id) {
        const res = await findSellingsByCompanyAndDate(
          company_id,
          formattedFirstDayOfWeek,
          formattedLastDayOfWeek
        );
        if (res != null) {
          setSellings(res.data ? res.data : []);
        }
      } else {
        const res = await findSellByDate(
          formattedFirstDayOfWeek,
          formattedLastDayOfWeek
        );
        if (res != null) {
          setSellings(res.data ? res.data : []);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get Sellings in Current Month
  const getSellingsOnYear = async () => {
    setSellings([]);
    try {
      const today = new Date(`${selectedYear}-${selectedMonth}-01`);

      const firstDayOfYear = new Date(today.getFullYear(), 0, 1); // Primeiro dia do ano atual
      const lastDayOfYear = new Date(today.getFullYear(), 11, 31); // Último dia do ano atual
      if (company_id) {
        const res = await findSellingsByCompanyAndDate(
          company_id,
          formatDate(firstDayOfYear),
          formatDate(lastDayOfYear)
        );
        if (res != null) {
          setSellings(res.data ? res.data : []);
        }
      } else {
        const res = await findSellByDate(
          formatDate(firstDayOfYear),
          formatDate(lastDayOfYear)
        );
        if (res != null) {
          setSellings(res.data ? res.data : []);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeRangeDate = (n: number, type: "month" | "year") => {
    if (type === "month") {
      setSelectedMonth(n);
      if (chartRangeDate) {
        const [year, month, day] = chartRangeDate.split("-");
        chartRangeDate = `${year}-${n}-01`;
      } else chartRangeDate = `${selectedYear}-${n}-01`;
    } else {
      setSelectedYear(n);
      if (chartRangeDate) {
        const [year, month, day] = chartRangeDate.split("-");
        chartRangeDate = `${n}-${month}-01`;
      } else chartRangeDate = `${n}-${selectedMonth}-01`;
    }
  };

  //Recupera vendas da empresa na semana e mês atual
  useEffect(() => {
    switch (chartRangeType) {
      case "week":
        getSellingsOnWeek();
        break;
      case "month":
        getSellingsOnMonth();
        break;
      case "year":
        getSellingsOnYear();
        break;
    }
  }, [selectedMonth, selectedYear]);

  const calcTotalRevenue = (sellings: Sell[]) => {
    let total = 0;

    sellings.forEach((item) => (total += item.total_price));
    return total.toFixed(2);
  };

  const calcAmountOfClothesSold = () => {
    let total = 0;

    sellings.forEach((item) => {
      item.items.forEach((itemSell) => {
        total += itemSell.amount;
      });
    });

    return total;
  };

  const getCardTitle = () => {
    switch (chartRangeType) {
      case "week":
        return "Vendas da Semana";
      case "month":
        return "Vendas do Mês";
      case "year":
        return "Vendas do Ano";
      case "allTime":
        return "Todas as Vendas";
      default:
        return "";
    }
  };

  const dateSelector = (
    <div className="flex gap-4">
      {chartRangeType === "month" && (
        <select
          name="month"
          className="shadow-primary px-3 py-1 rounded-lg"
          onChange={(e) =>
            handleOnChangeRangeDate(Number(e.target.value), "month")
          }
          value={selectedMonth}
        >
          <option value={1}>Janeiro</option>
          <option value={2}>Fevereiro</option>
          <option value={3}>Março</option>
          <option value={4}>Abril</option>
          <option value={5}>Maio</option>
          <option value={6}>Junho</option>
          <option value={7}>Julho</option>
          <option value={8}>Agosto</option>
          <option value={9}>Setembro</option>
          <option value={10}>Outubro</option>
          <option value={11}>Novembro</option>
          <option value={12}>Dezembro</option>
        </select>
      )}
      <select
        name="year"
        className="shadow-primary px-3 py-1 rounded-lg"
        onChange={(e) =>
          handleOnChangeRangeDate(Number(e.target.value), "year")
        }
        value={selectedYear}
      >
        {selectableYears.map((item, key) => (
          <option value={item} key={key}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );

  const handleOpenSalesReport = (sellings: Sell[]) => {
    dispatch(onOpen({ sales: sellings, reportRange: chartRangeType }));
  };

  return (
    <Card
      title={getCardTitle()}
      subtitle="Quantidade de vendas realizadas"
      headerRightChildren={dateSelector}
    >
      <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-end max-md:overflow-hidden">
        <div className="max-md:overflow-x-auto max-md:max-w-full max-md:overflow-y-hidden">
          <div className="max-md:min-w-[500px]">
            <ChartSellings
              sellings={sellings}
              width={460}
              height={300}
              chartRangeType={chartRangeType}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-blue-50 rounded-lg mt-1 p-3 text-lg text-blue-500">
              <AiOutlineShoppingCart />
            </span>
            <div>
              <h3 className="text-sm">Vendas Totais</h3>
              <span className="text-lg font-bold">
                {sellings.length > 0 ? sellings.length : "0"}{" "}
                {sellings.length == 1 ? "venda" : "vendas"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-2">
            <span className="bg-blue-50 rounded-lg mt-1 p-3 text-lg text-blue-500">
              <IoShirtOutline />
            </span>
            <div>
              <h3 className="text-sm">Peças de Roupas Vendidas</h3>
              <span className="text-lg font-bold">
                {sellings.length > 0 ? calcAmountOfClothesSold() : "0"}{" "}
                {sellings.length == 1 ? "peça" : "peças"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-blue-50 rounded-lg mt-1 p-3 text-lg text-blue-500">
              <MdOutlineAttachMoney />
            </span>
            <div>
              <h3 className="text-sm">Receita Total</h3>
              <span className="text-lg font-bold">
                R$ {sellings.length > 0 ? calcTotalRevenue(sellings) : "0.00"}
              </span>
            </div>
          </div>
          <ActionButton action={() => handleOpenSalesReport(sellings)}>
            Relatório de Vendas
          </ActionButton>
        </div>
      </div>
    </Card>
  );
};

export default CardSellings;
