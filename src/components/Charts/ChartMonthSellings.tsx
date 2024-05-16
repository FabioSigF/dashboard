import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";
import { Sell } from "../../types/global.type";
import ReactApexChart from "react-apexcharts";

type Props = {
  sellings: Sell[];
  width: number;
  height: number;
};

const ChartMonthSellings = ({ width, height, sellings }: Props) => {
  const [seriesData, setSeriesData] = useState<{ x: string; y: number }[]>([]);
  // Obtém o mês atual
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  //Agrega vendas por dia no mês
  useEffect(() => {
    const separateSalesByDayOfMonth = (sellings: Sell[]) => {
      const salesByDay: { [key: string]: number } = {};

      sellings.forEach((selling) => {
        const sellingDate = new Date(selling.date);
        const sellingDay = sellingDate.getDate().toString();

        if (!salesByDay[sellingDay]) {
          salesByDay[sellingDay] = 0;
        }

        salesByDay[sellingDay]++;
      });

      const salesData: { x: string; y: number }[] = Object.entries(
        salesByDay
      ).map(([day, count]) => ({
        x: day,
        y: count,
      }));

      setSeriesData(salesData);
    };

    if(sellings.length > 0 )separateSalesByDayOfMonth(sellings);
  }, [sellings, currentMonth]);

  const options: ApexOptions = {
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      tickAmount: 4,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: seriesData.map((item) => new Date(currentYear, currentMonth, Number(item.x)).getTime()).sort((a, b) => a - b),
    },
    tooltip: {
      x: {
        format: "dd/MM",
      },
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={[{ name: "Vendas", data: seriesData.map((item) => item.y) }]}
      type="area"
      width={width}
      height={height}
    />
  );
};

export default ChartMonthSellings;
