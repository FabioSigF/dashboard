import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { Breadcrumb } from "../../../types/global.type";
import { MdAddCircleOutline } from "react-icons/md";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Props = {};

const ItemSell = (props: Props) => {
  //Temporário
  const school = {
    escola: "E.E Marechal Castelo Branco",
    tipo: "Pública",
    tamanhos: ["8", "10", "12", "14", "P", "M", "G", "GG"],
    tipos_pecas: [
      "Camiseta MM",
      "Camiseta Cavada",
      "Camiseta M Longa",
      "Short Saia Plissada",
      "Short Saia Godê",
      "Short Saia Envelope",
      "Bermuda",
      "Calça",
      "Jaqueta",
    ],
    cores: ["Branco", "Azul", "Verde"],
    icone: "",
    cor_identifica: "blue-400",
  };

  const carrinho = [
    {
      tipo: "Bermuda",
      tamanho: "P",
      quantidade: 2,
      cor: "Padrão",
      preco_unidade: 39.9,
    },
    {
      tipo: "Camisa MM",
      tamanho: "P",
      quantidade: 2,
      cor: "Azul Celeste",
      preco_unidade: 36.9,
    },
    {
      tipo: "Camisa MM",
      tamanho: "P",
      quantidade: 1,
      cor: "Amarelo Canário",
      preco_unidade: 36.9,
    },
    {
      tipo: "Calça",
      tamanho: "P",
      quantidade: 3,
      cor: "Padrão",
      preco_unidade: 42.9,
    },
  ];

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
    "border border-gray-300-p text-gray-900 text-sm rounded-md focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 outline-none disabled:cursor-not-allowed";

  const [tipoInput, setTipoInput] = useState("");
  const [tamanhoInput, setTamanhoInput] = useState("");
  const [quantidadeInput, setQuantidadeInput] = useState(0);
  const [corInput, setCorInput] = useState("");
  const [coresDisponiveisSelect, setCoresDisponiveisSelect] = useState([""]);
  const [cart, setCart] = useState(carrinho);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  const atualizaCoresDisponiveis = () => {
    const tipo = tipoInput.split(" ");

    if (tipo[0] !== "Camiseta") {
      setCorInput("Padrão");
      setCoresDisponiveisSelect(["Padrão"]);
    } else {
      console.log(corInput);
      setCoresDisponiveisSelect(school.cores);
    }
  };

  const handleAddCart = (e) => {
    e.preventDefault();
    const sell = {
      tipo: tipoInput,
      tamanho: tamanhoInput,
      quantidade: quantidadeInput,
      cor: corInput,
      preco_unidade: 39.9,
    };

    setCart([...cart, sell]);
  };

  const handleRemoveCart = (e, item) => {
    e.preventDefault();
    //fazer por id
    const newCart = cart.filter((i) => i !== item);

    setCart(newCart);
  };

  const updateCartPrice = () => {
    setCartTotalPrice(0);
    let price = 0;

    cart.forEach((item) => {
      price += item.preco_unidade * item.quantidade;
    });

    setCartTotalPrice(price);
  };

  //Sempre que atualizar o tipo do uniforme, as cores disponíveis mudam
  useEffect(() => {
    atualizaCoresDisponiveis();
  }, [tipoInput]);

  useEffect(() => {
    updateCartPrice();
  }, [cart]);

  return (
    <div className="mx-6 my-6">
      <PageTitle title={school.escola} breadcrumb={breadcrumb} />
      <form className="grid grid-cols-5 gap-4 items-end  mt-12 mb-8">
        <div className="flex flex-col">
          <label htmlFor="item_sell_tipo" className="mb-2 text-sm font-medium">
            Tipo
          </label>
          <select
            name="item_sell_tipo"
            id="item_sell_tipo"
            className={`${inputStyle}`}
            value={tipoInput}
            onChange={(e) => setTipoInput(e.target.value)}
          >
            {school.tipos_pecas.sort().map((item, key) => (
              <option value={item} key={key}>
                {item}
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
            {school.tamanhos.map((item, key) => (
              <option value={item} key={key}>
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
          <label htmlFor="item_sell_cores" className="mb-2 text-sm font-medium">
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
          <button
            className="bg-green-400 text-white flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-green-500 transition w-full disabled:bg-gray-300"
            type="submit"
            onClick={(e) => handleAddCart(e)}
          >
            <MdAddCircleOutline className="text-2xl" />
            <span>Nova venda</span>
          </button>
        </div>
      </form>
      <div className="relative overflow-x-auto sm:rounded-lg border border-gray-300-p rounded-md shadow-[#919eab4d 0 0 2px]">
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
                  {item.tipo}
                </th>
                <td className="px-6 py-4">{item.cor}</td>
                <td className="px-6 py-4">{item.tamanho}</td>
                <td className="px-6 py-4">{item.quantidade}</td>
                <td className="px-6 py-4">
                  R$ {item.preco_unidade.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  R$ {(item.preco_unidade * item.quantidade).toFixed(2)}
                </td>
                <td className="px-6 py-4 flex gap-1">
                  <div className="text-xl cursor-pointer hover:text-black-600-p">
                    <FiEdit />
                  </div>
                  <div
                    className="text-xl cursor-pointer hover:text-black-600-p"
                    onClick={(e) => handleRemoveCart(e, item)}
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
              <td className="px-6 py-4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemSell;
