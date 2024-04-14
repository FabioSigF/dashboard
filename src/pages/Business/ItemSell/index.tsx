import { useEffect, useState } from "react";
//TYPES
import {
  Breadcrumb,
  Company,
  SellItem,
  Uniform,
} from "../../../types/global.type";
//ICONS
import { MdAddCircleOutline } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { getCompanyById } from "../../../services/company.service";
//HOOKS
import { useParams } from "react-router-dom";
//COMPONENTS
import PageTitle from "../../../components/PageTitle";
import ActionButton from "../../../components/ActionButton";

const ItemSell = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<Company>();

  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Início",
      link: "#!",
    },
    {
      title: "Cadastrar venda",
      link: "#!",
    },
    {
      title: "Escola",
      link: "#!",
    },
  ];

  const inputStyle =
    "shadow-primary p-containerWBoxShadow text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full outline-none disabled:cursor-not-allowed";

  const [tipoInput, setTipoInput] = useState("");
  const [tamanhoInput, setTamanhoInput] = useState("");
  const [quantidadeInput, setQuantidadeInput] = useState(0);
  const [corInput, setCorInput] = useState("");
  const [coresDisponiveisSelect, setCoresDisponiveisSelect] = useState([""]);
  const [tamanhos, setTamanhos] = useState([""]);
  const [cart, setCart] = useState<SellItem[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const handleAddCart = () => {
    const sell: SellItem = {
      _id: 0,
      name: tipoInput,
      size: tamanhoInput,
      amount: quantidadeInput,
      color: corInput,
      price_unit:
        company?.clothing?.find((item) => item.name === tipoInput)?.price ?? 0,
      total_price: 0,
    };
    sell.total_price = sell.amount * sell.price_unit;
    sell._id = Math.random();

    setCart((prevState) => [...prevState, sell]);
  };

  const handleRemoveCart = (id: number) => {
    const newCart = cart.filter((item) => item._id !== id);
    console.log(newCart);
    setCart(newCart);
  };

  const handleFinishSell = () => {
    console.log("Venda finalizada!");
  };

  //Sempre que atualizar o tipo do uniforme, as cores disponíveis mudam
  useEffect(() => {
    const atualizaTamanhosDisponiveis = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === tipoInput
      );
      if (cloth !== undefined && cloth.sizes.length > 0) {
        setTamanhos(() => [...cloth.sizes]);
      }
    };

    const atualizaCoresDisponiveis = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === tipoInput
      );
      if (cloth !== undefined && cloth.colors.length > 0) {
        setCoresDisponiveisSelect(cloth.colors);
      } else {
        setCorInput("Padrão");
        setCoresDisponiveisSelect(["Padrão"]);
      }
    };

    const atualizaInputs = () => {
      const cloth: Uniform | undefined = company?.clothing?.find(
        (item) => item.name === tipoInput
      );
      if (cloth) {
        setTipoInput(cloth.name);
        setTamanhoInput(cloth.sizes[0]);
        setQuantidadeInput(1);
        setCorInput(cloth.colors[0]);
      }
    };

    atualizaTamanhosDisponiveis();
    atualizaCoresDisponiveis();
    atualizaInputs();
  }, [tipoInput, company]);

  useEffect(() => {
    const inicializaCoresETamanhos = () => {
      if (company?.clothing && company.clothing.length > 0) {
        const firstCloth = company.clothing[0];
        if (firstCloth.sizes.length > 0) {
          setTamanhos(firstCloth.sizes);
        }
        if (firstCloth.colors.length > 0) {
          setCoresDisponiveisSelect(firstCloth.colors);
        }
      }
    };

    const inicializaInputs = () => {
      if (company?.clothing && company.clothing.length > 0) {
        const firstCloth = company.clothing[0];
        setTipoInput(firstCloth.name);
        if (firstCloth.sizes.length > 0) {
          setTamanhoInput(firstCloth.sizes[0]);
        }
        setQuantidadeInput(1);
        if (firstCloth.colors.length > 0) {
          setCorInput(firstCloth.colors[0]);
        }
      }
    };

    inicializaCoresETamanhos();
    inicializaInputs();
  }, [company]);

  useEffect(() => {
    const updateCartPrice = () => {
      setCartTotalPrice(0);
      let price = 0;

      cart.forEach((item) => {
        price += item.total_price;
      });

      setCartTotalPrice(price);
    };

    updateCartPrice();
  }, [cart]);

  useEffect(() => {
    const getCompany = async () => {
      try {
        if (id) {
          const res = await getCompanyById(id);
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
  }, [id]);

  useEffect(() => {}, [company]);

  return (
    <div className="mx-6 my-6">
      {company ? (
        <div>
          <PageTitle title={company?.name} breadcrumb={breadcrumb} />
          <form className="grid grid-cols-5 gap-4 items-end mt-12 mb-8">
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
                value={tipoInput}
                onChange={(e) => handleUpdateTipoInput(e.target.value)}
              >
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
                value={tamanhoInput}
                onChange={(e) => setTamanhoInput(e.target.value)}
              >
                {tamanhos.map((item, key) => (
                  <option key={key} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="item_sell_quantidade"
                className="mb-2 text-sm font-medium"
              >
                Quantidade
              </label>
              <input
                type="number"
                name="item_sell_quantidade"
                id="item_sell_quantidade"
                value={quantidadeInput}
                onChange={(e) => setQuantidadeInput(Number(e.target.value))}
                className={`${inputStyle}`}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="item_sell_cores"
                className="mb-2 text-sm font-medium"
              >
                Cores
              </label>
              <select
                name="item_sell_cores"
                id="item_sell_cores"
                className={`${inputStyle}`}
                value={corInput}
                onChange={(e) => setCorInput(e.target.value)}
                disabled={coresDisponiveisSelect.length > 1 ? false : true}
              >
                {coresDisponiveisSelect.map((item, key) => (
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
                action={handleAddCart}
                disabled={quantidadeInput > 0 ? false : true}
                type="button"
              >
                <MdAddCircleOutline className="text-2xl" />
                <span>Adicionar ao carrinho</span>
              </ActionButton>
            </div>
          </form>
          <div className="relative overflow-x-auto sm:rounded-lg shadow-primary p-containerWBoxShadow rounded-md">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-lg text-gray-700">
                <tr className="">
                  <th scope="col" className="px-6 py-3 font-medium">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Cor
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Tamanho
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Quantidade
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Preço
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Total
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Ação
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, key) => (
                  <tr className="bg-white border-b  hover:bg-gray-50" key={key}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {item.name}
                    </th>
                    <td className="px-6 py-4">{item.color}</td>
                    <td className="px-6 py-4">{item.size}</td>
                    <td className="px-6 py-4">{item.amount}</td>
                    <td className="px-6 py-4">
                      R$ {item.price_unit.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      R$ {item.total_price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className="text-xl cursor-pointer hover:text-black-600-p"
                        onClick={() => handleRemoveCart(item._id!)}
                      >
                        <FiTrash2 />
                      </div>
                    </td>
                  </tr>
                ))}
                <tr className="relative bg-white font-medium text-gray-900 whitespace-nowrap">
                  <th></th>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4 ">Subtotal:</td>
                  <td className="px-6 py-4">R$ {cartTotalPrice.toFixed(2)}</td>
                  <td className="pl-6 py-4">
                    <ActionButton
                      action={handleFinishSell}
                      disabled={cartTotalPrice > 0 ? false : true}
                    >
                      <span>Finalizar pedido</span>
                    </ActionButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="shadow-primary p-containerWBoxShadow text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full outline-none disabled:cursor-not-allowed">Carregando...</div>
      )}
    </div>
  );
};

export default ItemSell;
