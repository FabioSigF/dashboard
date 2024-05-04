import React from "react";
import ActionButton from "../../ActionButton";
import Card from "..";
import ChartLastWeekSellings from "../../Charts/ChartLastWeekSellings";
import { Sell } from "../../../types/global.type";

type Props = {
  weekSellings: Sell[];
};

const CardWeekSellings = ({weekSellings}: Props) => {

  const calcTotalRevenue = (sellings: Sell[]) => {
    let total = 0;

    sellings.forEach((item) => (total += item.total_price));
    return total.toFixed(2);
  };

  const calcAmountOfClothesSold = () => {
    let total = 0;

    weekSellings.forEach((item) => {
      item.items.forEach((itemSell) => {
        total += itemSell.amount
      })
    })

    return total;
  }

  return (
    <Card title="Vendas da Semana" subtitle="Quantidade de vendas realizadas">
      <div className="flex gap-8">
        <ChartLastWeekSellings
          sellings={weekSellings}
          width={480}
          height={300}
        />
        <div className="flex flex-col gap-8">
          <div className="flex gap-3">
            <span className="w-3 h-3 bg-primary-300 rounded-full mt-1"></span>
            <div>
              <h3 className="text-sm">Vendas Totais da Semana</h3>
              <span className="text-xl font-bold">
                {weekSellings.length} vendas
              </span>
            </div>
          </div>
          <div className="flex gap-3 mb-2">
            <span className="w-3 h-3 bg-primary-300 rounded-full mt-1"></span>
            <div>
              <h3 className="text-sm">Peças de Roupas Vendidas na Semana</h3>
              <span className="text-xl font-bold">
                {calcAmountOfClothesSold()} peças
              </span>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="w-3 h-3 bg-secondary-300 rounded-full mt-1"></span>
            <div>
              <h3 className="text-sm">Receita Total da Semana</h3>
              <span className="text-xl font-bold">
                R$ {calcTotalRevenue(weekSellings)}
              </span>
            </div>
          </div>
          <ActionButton action={() => {}}>Histórico de Vendas</ActionButton>
        </div>
      </div>
    </Card>
  );
};

export default CardWeekSellings;
