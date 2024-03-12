import Table from "../../../components/Table";
import Modal from "..";

//REDUX
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { onClose } from "../../../redux/stockModal/slice";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const Stock = () => {
  const tableItems = [
    {
      item: "Camisa MM",
      size: "6",
      color: "Azul Marinho",
      amount: 5,
    },
    {
      item: "Camisa",
      size: "P",
      color: "Branco",
      amount: 2,
    },
    {
      item: "Bermuda",
      size: "M",
      color: "Padrão",
      amount: 12,
    },
    {
      item: "Camisa MM",
      size: "5",
      color: "Azul Marinho",
      amount: 5,
    },
    {
      item: "Camisa MM",
      size: "5",
      color: "Azul Marinho",
      amount: 5,
    },
    {
      item: "Camisa MM",
      size: "6",
      color: "Azul Marinho",
      amount: 5,
    },
    {
      item: "Camisa",
      size: "P",
      color: "Branco",
      amount: 2,
    },
    {
      item: "Bermuda",
      size: "M",
      color: "Padrão",
      amount: 12,
    },
    {
      item: "Camisa MM",
      size: "5",
      color: "Azul Marinho",
      amount: 5,
    },
    {
      item: "Camisa MM",
      size: "5",
      color: "Azul Marinho",
      amount: 5,
    },
  ];
  const tableColumns = ["Tipo", "Cor", "Tamanho", "Quantidade", "Ação"];

  const tbody = (
    <tbody>
      {tableItems.map((item, key) => (
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
      ))}
    </tbody>
  );
  const { isOpen } = useAppSelector((state) => state.stock);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

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
