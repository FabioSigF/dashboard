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

  //Agrega vendas por dia no mês
  useEffect(() => {
    const separateSalesByDayOfMonth = (sellings: Sell[]) => {
      const salesByDayOfMonth: { [dayOfMonth: string]: number } = {};

      // Inicializa as contagens para todos os 31 dias do mês
      for (let day = 1; day <= 31; day++) {
        salesByDayOfMonth[
          `${day.toString().padStart(2, "0")}/${(currentMonth + 1)
            .toString()
            .padStart(2, "0")}`
        ] = 0;
      }

      // Itera sobre as vendas e incrementa a contagem para o dia correspondente do mês
      sellings.forEach((selling) => {
        const date = new Date(selling.date);
        const dayOfMonth = `${date.getDate().toString().padStart(2, "0")}/${(
          currentMonth + 1
        )
          .toString()
          .padStart(2, "0")}`;
        salesByDayOfMonth[dayOfMonth]++;
      });

      const newSeriesData = [];
      for (let day = 1; day <= 31; day++) {
        const sale =
          salesByDayOfMonth[
            `${day.toString().padStart(2, "0")}/${(currentMonth + 1)
              .toString()
              .padStart(2, "0")}`
          ];
        // Começando de 1 até 31
        if (sale > 0) {
          newSeriesData.push({
            x: `${day.toString().padStart(2, "0")}/${(currentMonth + 1)
              .toString()
              .padStart(2, "0")}`,
            y: sale,
          });
        }
      }
      setSeriesData(newSeriesData);
    };

    if (sellings.length > 0) separateSalesByDayOfMonth(sellings);
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
      type: "category",
      categories: seriesData.map((item) => item.x),
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
