import { Breadcrumb } from "../../types/global.type";
import CardSellings from "../../components/Card/CardSellings";
import PageTitle from "../../components/PageTitle";
import ChartSellCategories from "../../components/Charts/ChartSellCategories";

const Analytics = () => {
  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Início",
      link: "#!",
    },
    {
      title: "Analítico",
      link: "#!",
    },
  ];

  return (
    <div className="mx-6 my-6">
      <div className="mb-12">
        <PageTitle title="Análises" breadcrumb={breadcrumb} />
      </div>
      <div className="flex flex-col gap-8">
        <CardSellings chartRangeType="year" />
        <CardSellings chartRangeType="month" />
        <CardSellings chartRangeType="week" />
        <ChartSellCategories />
      </div>
    </div>
  );
};

export default Analytics;
