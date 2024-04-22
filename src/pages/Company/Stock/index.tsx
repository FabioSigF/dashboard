import { useEffect, useState } from "react";
//TYPES
import {
  Company,
  Stock as StockType,
  Uniform,
} from "../../../types/global.type";
//SERVICE API
import {
  getStockByCompany,
  updateStock,
} from "../../../services/stock.service";
import { getCompanyById } from "../../../services/company.service";
//ICONS
import { FiCheck, FiEdit } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
//STYLES
import { inputStyle } from "../../../styles/input";
import { mainDiv } from "../../../styles/div";
//COMPONENTS
import Table from "../../../components/Table";
import ActionButton from "../../../components/ActionButton";
import { toast } from "react-toastify";

type Props = {
  company_id: string;
};

const Stock = ({ company_id }: Props) => {
  //States Data API
  const [stock, setStock] = useState<StockType[]>([]);
  const [company, setCompany] = useState<Company>();

  //States de busca
  const [typeSearched, setTypeSearched] = useState("");
  const [sizeSearched, setSizeSearched] = useState("");
  const [colorSearched, setColorSearched] = useState("");
  const [colorsAvailable, setColorsAvailable] = useState([""]);
  const [sizesAvailable, setSizesAvailable] = useState([""]);

  //State de Edição
  const [amountEdited, setAmountEdited] = useState(0);
  const [isBeingEdited, setIsBeingEdited] = useState(false);

  const getStock = async () => {
    try {
      const res = await getStockByCompany(company_id);
      if (res !== null) setStock(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateItemStock = async (item: StockType) => {
    if (isBeingEdited) {
      try {
        const data = {
          _id: item._id,
          item: item.item,
          company: item.company,
          size: item.size,
          color: item.color,
          amount: amountEdited,
        };
        const res = await updateStock(data);
        console.log(res);
        toast.success(res.data.message);
      } catch (error) {
        console.log(error);
        toast.error("Não foi possível atualizar o item do estoque!");
      }
      setIsBeingEdited(false);
      setAmountEdited(item.amount);
      getStock();
    } else {
      setIsBeingEdited(true);
      setAmountEdited(item.amount);
    }
  };

  useEffect(() => {
    getStock();
  }, [company_id]);

  const tableColumns = ["Tipo", "Cor", "Tamanho", "Quantidade", "Ação"];

  const tbody = (
    <tbody>
      {stock ? (
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
            <td className="px-6 py-4">
              <input
                type="number"
                value={isBeingEdited ? amountEdited : item.amount}
                className={`${
                  isBeingEdited ? "border" : "border-transparent"
                } bg-transparent rounded-lg w-16 h-8 pl-2`}
                disabled={isBeingEdited ? false : true}
                onChange={(e) => setAmountEdited(Number(e.target.value))}
              />
            </td>
            <td className="px-6 py-4 flex gap-1">
              <div
                className="text-xl cursor-pointer hover:text-black-600-p"
                onClick={() => handleUpdateItemStock(item)}
              >
                {isBeingEdited ? <FiCheck /> : <FiEdit />}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <span>Essa empresa ainda não possui vendas...</span>
      )}
    </tbody>
  );

  //Sempre que atualizar o tipo do uniforme, as cores disponíveis mudam
  useEffect(() => {
    const atualizasizesAvailableDisponiveis = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === typeSearched
      );
      if (cloth !== undefined && cloth.sizes.length > 0) {
        setSizesAvailable(() => [...cloth.sizes]);
      }
    };

    const atualizaCoresDisponiveis = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === typeSearched
      );
      if (cloth !== undefined && cloth.colors.length > 0) {
        //@ts-expect-error Tipagem de colors
        setColorsAvailable(cloth.colors);
      } else {
        setColorSearched("Padrão");
        setColorsAvailable(["Padrão"]);
      }
    };

    const atualizaInputs = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === typeSearched
      );
      if (cloth) {
        setTypeSearched(cloth.name);
        setSizeSearched(cloth.sizes[0]);
        setColorSearched(cloth.colors[0]);
      }
    };

    atualizasizesAvailableDisponiveis();
    atualizaCoresDisponiveis();
    atualizaInputs();
  }, [typeSearched, company]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        if (company_id) {
          const res = await getCompanyById(company_id);
          console.log(res);
          if (res != null) {
            setCompany(res);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCompany();
  }, [company_id]);

  return (
    <div>
      {company ? (
        <div>
          <form className="grid grid-cols-4 gap-4 items-end mb-8">
            <div className="flex flex-col">
              <label
                htmlFor="item_sell_tipo"
                className="mb-2 text-sm font-medium"
              >
                Tipo
              </label>
              <select
                name="item_sell_tipo"
                id="item_sell_tipo"
                className={`${inputStyle}`}
                value={typeSearched}
                onChange={(e) => setTypeSearched(e.target.value)}
              >
                <option value="Selecione...">Selecione</option>
                {company.clothing?.map((item, key) => (
                  <option
                    value={`${item.name ? item.name : "Carregando..."}`}
                    key={key}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="item_sell_tamanho"
                className="mb-2 text-sm font-medium"
              >
                Tamanho
              </label>
              <select
                name="item_sell_tamanho"
                id="item_sell_tamanho"
                className={`${inputStyle}`}
                value={sizeSearched}
                onChange={(e) => setSizeSearched(e.target.value)}
              >
                {sizesAvailable.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="item_sell_cores"
                className="mb-2 text-sm font-medium"
              >
                Cor
              </label>
              <select
                name="item_sell_cores"
                id="item_sell_cores"
                className={`${inputStyle}`}
                value={colorSearched}
                onChange={(e) => setColorSearched(e.target.value)}
                disabled={colorsAvailable.length > 1 ? false : true}
              >
                <option value="Selecione...">Selecione</option>
                {colorsAvailable.map((item, key) => (
                  <option value={item} key={key}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <ActionButton
                bgColor="bg-green-400 hover:bg-green-500"
                extraCSS="w-full py-3.5"
                action={() => {}}
                type="button"
              >
                <MdAddCircleOutline className="text-2xl" />
                <span>Buscar Item</span>
              </ActionButton>
            </div>
          </form>
          <div className={`${mainDiv}`}>
            <Table columns={tableColumns} tbody={tbody} />
          </div>
        </div>
      ) : (
        <span>Carregando estoque...</span>
      )}
    </div>
  );
};

export default Stock;
