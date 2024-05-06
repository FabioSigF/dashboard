import ActionButton from "../../ActionButton";
import Card from "..";
import { Sell } from "../../../types/global.type";
import ChartSellings from "../../Charts/ChartSellings";
import { useEffect, useState } from "react";
import { findSellingsByCompanyAndDate } from "../../../services/sell.service";

type Props = {
  company_id: string;
  chartRangeDate?: string;
  chartRangeType: "week" | "month" | "year" | "allTime";
};

const CardSellings = ({
  company_id,
  chartRangeDate,
  chartRangeType,
}: Props) => {
  const [sellings, setSellings] = useState<Sell[]>([]);

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
      let today;
      if (chartRangeDate) {
        today = new Date(chartRangeDate);
      } else {
        today = new Date();
      }
      
      // Obtém o primeiro dia do mês atual
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  
      // Obtém o último dia do mês atual
      const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
      if (company_id) {
        const res = await findSellingsByCompanyAndDate(
          company_id,
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get Sellings in Current Month
  const getSellingsOnYear = async () => {
    setSellings([]);
    try {
      let today;
      if (chartRangeDate) {
        today = new Date(chartRangeDate);
      } else {
        today = new Date();
      }
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
      }
    } catch (error) {
      console.log(error);
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
  }, []);

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

  return (
    <Card title={getCardTitle()} subtitle="Quantidade de vendas realizadas">
        <div className="flex gap-8">
          <ChartSellings
            sellings={sellings}
            width={480}
            height={300}
            chartRangeType={chartRangeType}
          />
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <span className="w-3 h-3 bg-primary-300 rounded-full mt-1"></span>
              <div>
                <h3 className="text-sm">Vendas Totais</h3>
                <span className="text-xl font-bold">
                  {sellings.length > 0 ? sellings.length : "0"} vendas
                </span>
              </div>
            </div>
            <div className="flex gap-3 mb-2">
              <span className="w-3 h-3 bg-primary-300 rounded-full mt-1"></span>
              <div>
                <h3 className="text-sm">Peças de Roupas Vendidas</h3>
                <span className="text-xl font-bold">
                  {sellings.length > 0 ? calcAmountOfClothesSold() : "0"} peças
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-3 h-3 bg-secondary-300 rounded-full mt-1"></span>
              <div>
                <h3 className="text-sm">Receita Total</h3>
                <span className="text-xl font-bold">
                  R$ {sellings.length > 0 ? calcTotalRevenue(sellings) : "0.00"}
                </span>
              </div>
            </div>
            <ActionButton action={() => {}}>Histórico de Vendas</ActionButton>
          </div>
        </div>
    </Card>
  );
};

export default CardSellings;
