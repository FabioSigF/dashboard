import React from "react";
import { FaShippingFast } from "react-icons/fa";
import {
  MdAddCircleOutline,
  MdGroup,
  MdOutlineCreditCard,
  MdOutlineShoppingBag,
} from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import { Breadcrumb } from "../../types/global.type";
import ActionButton from "../../components/ActionButton";
import { FiEdit, FiSquare, FiTrash2, FiCheckSquare } from "react-icons/fi";

type Props = {};

const Schedule = (props: Props) => {
  function mostraData(tempo: string) {
    const date = new Date(tempo);
    return `${date.getDate()}/${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }/${date.getFullYear()}`;
  }

  function mostrarHorario(tempo: string) {
    const date = new Date(tempo);

    return `${date.getHours()}:${date.getMinutes()}`;
  }

  const compromissos = [
    {
      title: "Vender no Metta",
      type: "sell",
      icon: <MdOutlineShoppingBag />,
      bgColor: "bg-green-400",
      date: "2024-03-11T22:45:56.053+00:00",
      isDone: false,
    },
    {
      title: "Comprar Tecido",
      type: "buy",
      icon: <MdOutlineCreditCard />,
      bgColor: "bg-red-500",
      date: "2024-03-11T22:45:56.053+00:00",
      isDone: false,
    },
    {
      title: "Entregar Uniforme ABC Escola",
      type: "order",
      icon: <FaShippingFast />,
      bgColor: "bg-yellow-600",
      date: "2024-03-11T22:45:56.053+00:00",
      isDone: false,
    },
    {
      title: "Reunião com Empresa",
      type: "meeting",
      icon: <MdGroup />,
      bgColor: "bg-blue-300",
      date: "2024-03-11T22:45:56.053+00:00",
      isDone: true,
    },
    {
      title: "Entrar em contato com fornecedor",
      type: "contact",
      icon: <MdGroup />,
      bgColor: "bg-gray-400",
      date: "2024-03-11T22:45:56.053+00:00",
      isDone: false,
    },
  ];

  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Aplicativos",
      link: "/app",
    },
    {
      title: "Agenda",
      link: "/app/schedule",
    },
  ];
  return (
    <div className="mx-6 my-6">
      <div className="flex justify-between items-start mb-12">
        <PageTitle title="Agenda" breadcrumb={breadcrumb} />
        <ActionButton bgColor="bg-green-400 hover:bg-green-500">
          <MdAddCircleOutline className="text-2xl" />
          <span>Novo Compromisso</span>
        </ActionButton>
      </div>
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        <div className="flex items-center pb-4 mb-4 border-b">
          <span className="w-3/6 font-bold">Compromisso</span>
          <span className="w-1/6 font-bold">Data</span>
          <span className="w-1/6 font-bold">Horário</span>
          <span className="w-1/6 font-bold">Ação</span>
        </div>
        <div className="flex flex-col gap-2">
          {compromissos.length > 0 ? (
            compromissos.map((item, key) => (
              <div className="flex items-center" key={key}>
                <div className="w-3/6 flex gap-4 items-center">
                  <div
                    className={`rounded-md ${item.bgColor} text-white w-[40px] h-[40px] flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span>{item.title}</span>
                  </div>
                </div>
                <div className="w-1/6 text-sm font-bold">
                  {mostraData(item.date)}
                </div>
                <div className="w-1/6 text-sm font-bold">
                  {mostrarHorario(item.date)}
                </div>
                <div className="w-1/6 text-sm font-bold flex items-center gap-2">
                  <div className="text-xl cursor-pointer hover:text-black-600-p">
                    <FiEdit />
                  </div>
                  <div className="text-xl cursor-pointer hover:text-black-600-p">
                    <FiTrash2 />
                  </div>
                  <div className="text-xl cursor-pointer hover:text-black-600-p">
                    {item.isDone ? <FiCheckSquare /> : <FiSquare />}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <span className="text-gray-400 text-center">
              Não há compromissos ainda...
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
