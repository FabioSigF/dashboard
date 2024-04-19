import { IoShirtOutline } from "react-icons/io5";
import {
  MdOutlineCreditCard,
  MdOutlinePerson,
  MdOutlineShoppingBag,
} from "react-icons/md";
import Schedule from "../Schedule";

const Home = () => {
  const cards = [
    {
      bgColor: "bg-primary-300",
      title: "Receita Total do Mês",
      value: "R$ 3249,00",
      icon: <MdOutlineCreditCard />,
    },
    {
      bgColor: "bg-yellow-p-500",
      title: "Vendas no Mês",
      value: "349",
      icon: <MdOutlineShoppingBag />,
    },
    {
      bgColor: "bg-secondary-300",
      title: "Marca Mais Vendida",
      value: "Metta",
      icon: <IoShirtOutline />,
    },
    {
      bgColor: "bg-red-p-500",
      title: "Clientes Atendidos Hoje",
      value: "12",
      icon: <MdOutlinePerson />,
    },
  ];

  function calculaTempo(tempo: string) {
    const dataTempo = new Date(tempo);
    const date = new Date();
    //Tirar a diferença de GMT e transformar milissegundos para segundos
    const diferencaTempo = Number(
      (
        (date.getTime() - dataTempo.getTime() - 60000 * 180) /
        (1000 * 60)
      ).toFixed(0)
    );

    if (diferencaTempo < 60) {
      return `${diferencaTempo} min`;
    } else if (diferencaTempo < 1440) {
      return `${(diferencaTempo / 60).toFixed(0)} horas`;
    } else {
      return `${dataTempo.getDate()}/${
        dataTempo.getMonth() < 10
          ? `0${dataTempo.getMonth()}`
          : dataTempo.getMonth()
      }/${dataTempo.getFullYear()}`;
    }
  }

  const vendasRecentes = [
    {
      company: "Centro Pedagógico Metta",
      totalPrice: 349.99,
      data: "2024-03-11T22:45:56.053+00:00",
      items: [
        {
          item: "Camiseta MM",
          size: "P",
          amount: 2,
          color: "Preta",
        },
        {
          item: "Camiseta MM",
          size: "P",
          amount: 5,
          color: "Azul Marinho",
        },
      ],
    },
    {
      company: "E.E Marechal Castelo Branco",
      totalPrice: 1249.99,
      data: "2024-03-11T13:53:56.053+00:00",
      items: [
        {
          item: "Camiseta MM",
          size: "P",
          amount: 12,
          color: "Preta",
        },
        {
          item: "Calça",
          size: "P",
          amount: 2,
          color: "",
        },
        {
          item: "Camiseta",
          size: "P",
          amount: 6,
          color: "Verde Bandeira",
        },
      ],
    },
    {
      company: "Centro Pedagógico Metta",
      totalPrice: 99.99,
      data: "2024-03-10T13:53:56.053+00:00",
      items: [
        {
          item: "Camiseta Manga Longa",
          size: "P",
          amount: 3,
          color: "Rosa Pink",
        },
      ],
    },
    {
      company: "Colégio Drummond",
      totalPrice: 159.99,
      data: "2024-03-10T13:53:56.053+00:00",
      items: [
        {
          item: "Camiseta",
          size: "M",
          amount: 4,
          color: "Preta",
        },
        {
          item: "Jaqueta",
          size: "G",
          amount: 1,
          color: "",
        },
      ],
    },
    {
      company: "E.E Marechal Castelo Branco",
      totalPrice: 1249.99,
      data: "2024-03-10T13:53:56.053+00:00",
      items: [
        {
          item: "Camiseta MM",
          size: "P",
          amount: 12,
          color: "Preta",
        },
        {
          item: "Calça",
          size: "P",
          amount: 2,
          color: "",
        },
        {
          item: "Camiseta",
          size: "P",
          amount: 6,
          color: "Verde Bandeira",
        },
      ],
    },
  ];

  return (
    <div className="mx-6 my-6">
      <div className="grid grid-cols-4 gap-4">
        {cards.map((item, key) => (
          <div
            className="shadow-primary p-containerWBoxShadow rounded-lg flex gap-4 items-center"
            key={key}
          >
            <div
              className={`rounded-full text-white ${item.bgColor} w-[60px] h-[60px] text-3xl flex items-center justify-center`}
            >
              {item.icon}
            </div>
            <div className="flex flex-col">
              <span className="font-bold">{item.value}</span>
              <span className="text-gray-400 text-sm">{item.title}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Schedule isAWidget />
        <div className="shadow-primary p-containerWBoxShadow rounded-lg">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-xl font-medium">Vendas Recentes</h2>
            <p className="text-gray-400 text-sm">Últimas Vendas Realizadas</p>
          </div>
          <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
            <span className="w-4/6 text-sm font-bold">Produto</span>
            <span className="w-1/6 text-sm font-bold">Preço</span>
            <span className="w-1/6 text-sm font-bold">Data</span>
          </div>
          <div className="flex flex-col gap-2">
            {vendasRecentes.map((sell, key) => (
              <div className="flex items-center" key={key}>
                <div className="w-4/6 flex gap-4 items-center">
                  <div
                    className={`rounded-md ${
                      key % 2 === 0 ? "bg-green-400" : "bg-secondary-300"
                    } text-white w-[40px] h-[40px] flex items-center justify-center`}
                  >
                    <IoShirtOutline />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{sell.company}</span>
                    <span className="text-gray-400 text-xs overflow-hidden">
                      {sell.items.map((item, key) => (
                        <span key={key}>
                          {item.amount} {item.item}
                          {key !== sell.items.length - 1 && ", "}
                        </span>
                      ))}
                    </span>
                  </div>
                </div>
                <div className="w-1/6 text-sm font-bold">
                  R$ {sell.totalPrice}
                </div>
                <div className="w-1/6 text-sm font-bold">
                  {calculaTempo(sell.data)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
