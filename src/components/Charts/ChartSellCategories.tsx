import { useEffect, useState } from "react";
//Component
import Card from "../Card";
//Service
import { findSellByDate } from "../../services/sell.service";
//Apex Chart
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
//Types
import { Company, Sell } from "../../types/global.type";
//Date
import { format } from "date-fns";
import { getCompanyById } from "../../services/company.service";

const ChartSellCategories = () => {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const selectableYears = [currentYear, currentYear - 1, currentYear - 2];
  const [loadingMessage, setLoadingMessage] = useState("Carregando...");
  const [chartData, setChartData] = useState<{
    name: string[];
    data: number[];
  }>({
    name: [],
    data: [],
  });

  const getSellingsOnYear = async () => {
    setLoadingMessage("Carregando...");
    setChartData({
      name: [],
      data: [],
    });
    try {
      const firstDayOfYear = new Date(selectedYear, 0, 1); // Primeiro dia do ano atual
      const lastDayOfYear = new Date(selectedYear, 11, 31); // Último dia do ano atual

      const res = await findSellByDate(
        format(firstDayOfYear, "yyyy-MM-dd"),
        format(lastDayOfYear, "yyyy-MM-dd")
      );

      if (res != null) {
        const visitedCompany: { company_id: string; category: string }[] = [];
        const sales: Sell[] = res.data;
        const topSalesArray: { category: string; total_price: number }[] = [];

        for (const item of sales) {
          const alreadyVisitedCompanyIndex = visitedCompany.findIndex(
            (existingItem) => existingItem.company_id === item.company
          );

          if (alreadyVisitedCompanyIndex === -1) {
            const company: Company = await getCompanyById(item.company);

            visitedCompany.push({
              company_id: item.company,
              category: company.category,
            });

            const existingItemIndex = topSalesArray.findIndex(
              (existingItem) => existingItem.category === company.category
            );

            if (existingItemIndex !== -1) {
              topSalesArray[existingItemIndex].total_price += item.total_price;
            } else {
              topSalesArray.push({
                category: company.category || "",
                total_price: item.total_price || 0,
              });
            }
          } else {
            const existingItemIndex = topSalesArray.findIndex(
              (existingItem) =>
                existingItem.category ===
                visitedCompany[alreadyVisitedCompanyIndex].category
            );
            topSalesArray[existingItemIndex].total_price += item.total_price;
          }
        }

        console.log(visitedCompany);
        console.log(topSalesArray);

        topSalesArray.sort((a, b) => b.total_price - a.total_price);

        setChartData({
          name: topSalesArray.map((item) => item.category),
          data: topSalesArray.map((item) =>
            Number(item.total_price.toFixed(2))
          ),
        });
      }
    } catch (error) {
      console.log(error);
      setLoadingMessage("Não há itens vendidos nesse período.");
    }
  };

  const handleOnChangeRangeDate = (n: number) => {
    setSelectedYear(n);
  };

  const dateSelector = (
    <div className="flex gap-4">
      <select
        name="year"
        className="shadow-primary px-3 py-1 rounded-lg"
        onChange={(e) => handleOnChangeRangeDate(Number(e.target.value))}
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

  useEffect(() => {
    getSellingsOnYear();
  }, [selectedYear]);

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
      title="Ranking: Categorias"
      subtitle="Comparativo de vendas por categoria"
      headerRightChildren={dateSelector}
    >
      {chartData.data.length > 0 ? (
        <ReactApexChart
          options={options}
          series={chartData.data}
          type="donut"
          height={347}
        />
      ) : (
        <div className="min-h-[347px]">{loadingMessage}</div>
      )}
    </Card>
  );
};

export default ChartSellCategories;
