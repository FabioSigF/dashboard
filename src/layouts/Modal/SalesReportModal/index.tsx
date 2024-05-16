//Redux
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { onClose } from "../../../redux/salesReportModal/slice";
//Date
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

//Components
import Modal from "..";

const SalesReportModal = () => {
  const { isOpen, sales, reportRange } = useAppSelector(
    (state) => state.salesReport
  );

  const sortedSales = [...sales].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const currentMonth =
    sales.length > 0 && reportRange == "month"
      ? format(new Date(sales[0].date), "MMMM", { locale: ptBR })
      : "";
  const currentMonthCapitalized =
    currentMonth &&
    reportRange == "month" &&
    currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const currentYear = sales.length > 0 && new Date(sales[0].date).getFullYear();

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

  const body = (
    <div className="max-md:overflow-hidden">
      <div className="overflow-x-auto">
        <div className="max-md:min-w-[1000px]">
          <div className="grid grid-cols-10 pb-4 border-b">
            <div className="col-span-3">Produto</div>
            <div className="col-span-2">Cor</div>
            <div className="col-span-1">Tamanho</div>
            <div className="col-span-1">Quantidade</div>
            <div className="col-span-1">V. Unidade</div>
            <div className="col-span-1">V. Total</div>
            <div className="col-span-1">Data</div>
          </div>
          {sortedSales &&
            sortedSales.map((item, key) => (
              <ul
                key={key}
                className="grid grid-cols-10 items-center border-b text-black-600-p text-sm"
              >
                <div className="col-span-8 py-4">
                  {item.items.map((sale, salekey) => (
                    <li className="grid grid-cols-8" key={salekey}>
                      <div className="col-span-3">{sale.name}</div>
                      <div className="col-span-2">{sale.color}</div>
                      <div className="col-span-1">{sale.size}</div>
                      <div className="col-span-1">{sale.amount}</div>
                      <div className="col-span-1">
                        R$ {sale.price_unit.toFixed(2)}
                      </div>
                    </li>
                  ))}
                </div>
                <div className="col-span-1">
                  <span>R$ {item.total_price.toFixed(2)}</span>
                </div>
                <div className="col-span-1">
                  <span>{format(item.date, "dd/MM/yy")}</span>
                </div>
              </ul>
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      title={`Relatório de Vendas ${currentMonthCapitalized} ${currentYear}`}
      body={body}
      onClose={handleOnClose}
      isOpen={isOpen}
    />
  );
};

export default SalesReportModal;
