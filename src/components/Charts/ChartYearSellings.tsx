import { useEffect, useState } from "react";
import { Chart, Sell } from "../../types/global.type";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

type Props = {
  sellings: Sell[];
  width: number;
  height: number;
};

const ChartYearSellings = ({ width, height, sellings }: Props) => {
  const [seriesData, setSeriesData] = useState<Chart[]>([]);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  //Agrega vendas por data no ano
  useEffect(() => {
    const separeteSalesByMonth = (sellings: Sell[]) => {
      const salesByMonth: { [mothString: string]: number } = {};
      months.forEach((month) => {
        salesByMonth[month] = 0;
      });

      sellings.forEach((selling) => {
        const date = new Date(selling.date);
        const monthString = getMonthString(date);
        salesByMonth[monthString]++;
      });

      const newSeriesData = months.map((month) => ({
        x: month,
        y: salesByMonth[month] || 0,
      }));
      setSeriesData(newSeriesData);
    };
    separeteSalesByMonth(sellings);
  }, [sellings]);

  //Recupera o nome do mês
  const getMonthString = (date: Date) => {
    const month = date.getMonth();
    return months[month];
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
      categories: months.map((item) => item.slice(0, 3)), // Usar os dias da semana como categorias para o eixo X
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
export default ChartYearSellings;
