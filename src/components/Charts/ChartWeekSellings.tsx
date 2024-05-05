import { useEffect, useState } from "react";
import { Chart, Sell } from "../../types/global.type";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  sellings: Sell[];
  width: number;
  height: number;
};

const ChartWeekSellings = ({
  width,
  height,
  sellings
}: Props) => {
  const [seriesData, setSeriesData] = useState<Chart[]>([]);

  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  //Agrega vendas por data na semana
  useEffect(() => {
    const separateSalesByDate = (sellings: Sell[]) => {
      const salesByDayOfWeek: { [dayString: string]: number } = {};
      daysOfWeek.forEach((day) => {
        salesByDayOfWeek[day] = 0;
      });

      sellings.forEach((selling) => {
        const date = new Date(selling.date);
        const dayString = getDayString(date);
        salesByDayOfWeek[dayString]++;
      });

      const newSeriesData = daysOfWeek.map((day) => ({
        x: day,
        y: salesByDayOfWeek[day] || 0,
      }));
      setSeriesData(newSeriesData);
    };
    separateSalesByDate(sellings);
  }, [sellings]);

  //Recupera o nome do dia a partir da data
  const getDayString = (date: Date) => {
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  //Formata o rótulo da tabela "14/04 - Seg"
  const getDaysOfWeekFromDate = (sellings: Sell[]): string[] => {
    const currentDate = new Date(sellings[0]?.date);
    const result: string[] = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
      const formattedDate = `${newDate.getDate()}/${newDate.getMonth() + 1}`;
      const dayOfWeek = newDate.getDay();
      const dayString = `${formattedDate} - ${daysOfWeek[dayOfWeek].slice(
        0,
        3
      )}`;
      result.push(dayString);
    }

    return result;
  };

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 3,
        dataLabels: {
          position: "top",
        },
        columnWidth: 30,
      },
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: getDaysOfWeekFromDate(sellings), // Usar os dias da semana como categorias para o eixo X
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
      },
    },
  };

  const series = [
    {
      name: "Vendas",
      data: seriesData.map((item) => item.y),
    },
  ];

  return (
    <ReactApexChart
      options={options}
      series={series}
      width={width}
      height={height}
      type="bar"
    />
  );
};

export default ChartWeekSellings;
