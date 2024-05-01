import React, { useEffect, useState } from "react";
import { Chart as ChartType, Sell } from "../../types/global.type";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  sellings: Sell[];
};

const Chart = ({ sellings }: Props) => {
  const [seriesData, setSeriesData] = useState<ChartType[]>([]);
  const daysOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  useEffect(() => {
    const separateSalesByDate = (sellings: Sell[]) => {
      // Inicializar o mapeamento de vendas por dia da semana com contagem 0 para todos os dias
      const salesByDayOfWeek: { [dayString: string]: number } = {};
      daysOfWeek.forEach((day) => {
        salesByDayOfWeek[day] = 0;
      });

      // Mapear os valores das vendas para os dias da semana
      sellings.forEach((selling) => {
        const date = new Date(selling.date);
        const dayString = getDayString(date);
        salesByDayOfWeek[dayString]++;
      });

      // Criar array com os dados para o gráfico
      const newSeriesData = daysOfWeek.map((day) => ({
        x: day,
        y: salesByDayOfWeek[day] || 0, // Definir contagem como 0 se não houver vendas para o dia
      }));
      setSeriesData(newSeriesData);
    };

    separateSalesByDate(sellings);
  }, [sellings]);

  const getDayString = (date: Date) => {
    const dayOfWeek = date.getDay();
    return daysOfWeek[dayOfWeek];
  };

  const getDaysOfWeekFromDate = (sellings: Sell[]): string[] => {
    const currentDate = new Date(sellings[0]?.date);
    const result: string[] = [];

    for (let i = 0; i < 7; i++) {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() - currentDate.getDay() + i);
      const formattedDate = `${newDate.getDate()}/${newDate.getMonth() + 1}`;
      const dayOfWeek = newDate.getDay();
      const dayString = `${formattedDate} - ${daysOfWeek[dayOfWeek]}`;
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
      width={540}
      height={400}
      type="bar"
    />
  );
};

export default Chart;
