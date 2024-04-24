import Table from "../../../components/Table";
import Modal from "..";

//REDUX
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { onClose } from "../../../redux/stockModal/slice";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { getStockByCompany } from "../../../services/stock.service";
import { Stock as StockType } from "../../../types/global.type";
import { useEffect, useState } from "react";

const Stock = () => {
  const [stock, setStock] = useState<StockType[]>([]);

  const { isOpen } = useAppSelector((state) => state.stock);

  const idCompany = useAppSelector((state) => state.stock.idCompany);
  const dispatch = useAppDispatch();

  const getStock = async () => {
    if (idCompany) {
      try {
        const res = await getStockByCompany(idCompany);
        setStock(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getStock();
  }, [idCompany]);

  const handleOnClose = () => {
    dispatch(onClose());
    setStock([]);
  };

  const tableColumns = ["Tipo", "Cor", "Tamanho", "Quantidade", "Ação"];

  const tbody = (
    <tbody>
      {stock.length > 0 ? (
        stock.map((item, key) => (
          <tr className="bg-white border-b  hover:bg-gray-50" key={key}>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
            >
              {item.item}
            </th>
            <td className="px-6 py-4">{item.color}</td>
            <td className="px-6 py-4">{item.size}</td>
            <td className="px-6 py-4">{item.amount}</td>
            <td className="px-6 py-4 flex gap-1">
              <div className="text-xl cursor-pointer hover:text-black-600-p">
                <FiEdit />
              </div>
              <div className="text-xl cursor-pointer hover:text-black-600-p">
                <FiTrash2 />
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr className="px-6 w-full">
          <th
            scope="row"
            className="px-6 py-4"
          >
            Carregando estoque...
          </th>
        </tr>
      )}
    </tbody>
  );

  const body = (
    <div className="w-full">
      <Table columns={tableColumns} tbody={tbody} />
    </div>
  );

  return (
    <Modal
      title="Estoque: Centro Pedagógico Metta"
      body={body}
      onClose={() => handleOnClose()}
      isOpen={isOpen}
    />
  );
};

export default Stock;
