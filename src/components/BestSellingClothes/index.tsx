import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Component
import Card from "../Card";
//Service
import { findSellByCompanyId } from "../../services/sell.service";
//Apex Chart
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
//Types
import { SellItem, Sellings } from "../../types/global.type";

const BestSellingClothes = () => {
  const { id } = useParams();
  const [chartData, setChartData] = useState<{
    name: string[];
    data: number[];
  }>({
    name: [],
    data: [],
  });

  const getLastSales = async () => {
    if (id) {
      const res = await findSellByCompanyId(id);
      if (res != null) {
        const sales: Sellings[] = res;
        const itemCount: { [key: string]: number } = {};
        sales.forEach((sale) => {
          sale.items.forEach((item) => {
            const itemName = `${item.name} ${item.size} ${item.color}`;
            if (itemCount[itemName]) {
              itemCount[itemName] += item.amount;
            } else {
              itemCount[itemName] = item.amount;
            }
          });
        });
        const topSalesArray: SellItem[] = Object.entries(itemCount).map(
          ([itemName, amount]) => ({
            name: itemName,
            amount: amount,
            size: "",
            color: "",
            price_unit: 0,
            total_price: 0,
          })
        );

        topSalesArray.sort((a, b) => b.amount - a.amount);
        const top3Sales = topSalesArray.slice(0, 3);
        setChartData({
          name: top3Sales.map((item) => item.name),
          data: top3Sales.map((item) => item.amount),
        });
      }
    }
  };

  useEffect(() => {
    getLastSales();
  }, []);

  const options: ApexOptions = {
    labels: chartData.name,
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
    legend: {
      position: "bottom",
      formatter: function (seriesName, opts) {
        return `<div style='padding: 5px;'>${seriesName}</div>`;
      },
    },
  };

  return (
    <Card
      title="Uniformes Mais Vendidos"
      subtitle="Top roupas mais vendidas nesse ano"
    >
      <ReactApexChart
        options={options}
        series={chartData.data}
        type="donut"
        height={347}
      />
    </Card>
  );
};

export default BestSellingClothes;
