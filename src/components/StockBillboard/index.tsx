import { useEffect, useState } from "react";
import { Stock } from "../../types/global.type";
import { mainDiv } from "../../styles/div";
import { getStockByAmountAndId } from "../../services/stock.service";
import { IoCheckmark, IoWarningOutline } from "react-icons/io5";
import ActionButton from "../ActionButton";

type Props = {
  companyId: string;
};
const StockBillboard = ({ companyId }: Props) => {
  const [stockItems, setStockItems] = useState<Stock[]>([]);
  const [isOpenAlerts, setIsOpenAlerts] = useState(false);

  //Procura elementos do estoque que possuem menos de 3 unidades
  const handleSearchLowStock = async () => {
    try {
      const res: Stock[] = await getStockByAmountAndId("3", companyId);
      setStockItems(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSearchLowStock();
  }, []);

  return (
    <div className={`${mainDiv}`}>
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-xl font-medium cursor-pointer">Quadro de Avisos</h2>
        <p className="text-gray-400 text-sm">Administração do Estoque</p>
      </div>
      {stockItems.length > 0 ? (
        <div>
          <div className="mb-3">Alertas ({stockItems.length})</div>
          <ul
            className={`flex flex-col gap-2 ${
              !isOpenAlerts && "max-h-[150px] overflow-hidden"
            }`}
          >
            {stockItems.map((item, key) => (
              <li
                className="text-sm flex items-center gap-2 bg-red-200 py-4 px-3 border border-red-400 rounded-lg"
                key={key}
              >
                <IoWarningOutline className="text-red-500" />A {item.item} de
                tamanho {item.size} e cor {item.color} possui apenas{" "}
                {item.amount} unidades.
              </li>
            ))}
          </ul>
          {/*Valor 2 pois, com 3 stockItems, o terceiro fica cortado pelo limite de height*/}
          {stockItems.length > 2 && (
            <div className="pt-4">
              <ActionButton
                action={() => setIsOpenAlerts(!isOpenAlerts)}
                extraCSS="w-full justify-center"
              >
                {isOpenAlerts ? "Mostrar Menos" : "Mostrar Tudo"}
              </ActionButton>
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm flex items-center gap-2 bg-green-200 py-4 px-3 border border-green-400 rounded-lg">
          <IoCheckmark className="text-green-500" />
          Não há avisos por enquanto. Bom trabalho!
        </div>
      )}
    </div>
  );
};

export default StockBillboard;
