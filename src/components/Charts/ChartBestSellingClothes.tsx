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
import ActionButton from "../ActionButton";
import { useAppDispatch } from "../../redux/store";
import { onOpen } from "../../redux/uniformReportModal/slice";

const BestSellingClothes = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const [chartData, setChartData] = useState<{
    name: string[];
    data: number[];
  }>({
    name: [],
    data: [],
  });

  const [sales, setSales] = useState<SellItem[]>([]);

  const getLastSales = async () => {
    if (id) {
      const res = await findSellByCompanyId(id);
      if (res != null) {
        const sales: Sellings[] = res;
        const topSalesArray: SellItem[] = [];

        sales.forEach((sale) => {
          sale.items.forEach((item) => {
            const existingItemIndex = topSalesArray.findIndex(
              (existingItem) => existingItem.name === item.name && existingItem.size === item.size && existingItem.color === item.color
            );

            if (existingItemIndex !== -1) {
              // Se o item já existe em topSalesArray, atualize a quantidade
              topSalesArray[existingItemIndex].amount += item.amount;
              topSalesArray[existingItemIndex].total_price += item.total_price;
            } else {
              // Se o item ainda não existe em topSalesArray, adicione-o
              topSalesArray.push({
                name: item.name,
                amount: item.amount,
                size: item.size || "",
                color: item.color || "",
                price_unit: item.price_unit || 0,
                total_price: item.total_price || 0,
              });
            }
          });
        });

        topSalesArray.sort((a, b) => b.amount - a.amount);

        setSales(topSalesArray);

        const top3Sales = topSalesArray.slice(0, 3);
        setChartData({
          name: top3Sales.map((item) => `${item.name} ${item.color} ${item.size}`),
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

  const handleOpenReport = () => {
    console.log(sales);
    dispatch(onOpen({ list: sales }));
  };

  const headerBtn = (
    <ActionButton action={() => handleOpenReport()}>
      Lista Completa
    </ActionButton>
  );

  return (
    <Card
      title="Uniformes Mais Vendidos"
      subtitle="Top roupas mais vendidas nesse ano"
      headerRightChildren={headerBtn}
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
