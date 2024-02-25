import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Breadcrumb } from "../../types/global";
import { MdAddCircleOutline, MdSchool, MdSearch } from "react-icons/md";

type Props = {};

const NewSell = (props: Props) => {
  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Aplicativos",
      link: "/app",
    },
    {
      title: "Cadastrar Venda",
      link: "/app/new-sell",
    },
  ];

  const [sectionSchoolActive, setSectionSchoolActive] = useState(true);
  const escolas = [
    { nome: "Centro Pedagógico Metta", tipo: "Particular" },
    { nome: "E.E Marechal Castello Branco", tipo: "Pública" },
    { nome: "E.E Américo René Giannetti", tipo: "Pública" },
    { nome: "Colégio Drummong", tipo: "Particular" },
  ];

  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mx-6 my-6">
      <PageTitle title="Cadastrar Venda" breadcrumb={breadcrumb} />
      <form
        className="flex gap-2 items-center border border-gray-300-p rounded-md relative w-full py-2 px-3 mt-12 mb-8"
        onSubmit={(e) => handleOnSearch(e)}
      >
        <MdSearch className="absolute" />
        <input
          type="text"
          className="w-full pl-6 text-sm"
          placeholder="Digite o nome da instituição..."
        />
      </form>
      <div className="p-6 border border-gray-300-p rounded-md">
        <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
          <div className="w-4/6">
            <div
              className={`w-min flex gap-6 relative px-3 before:absolute before:w-[45%] before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all transition ${
                sectionSchoolActive
                  ? "before:translate-x-0"
                  : "before:translate-x-[95%] before:w-[50%]"
              }`}
            >
              <span
                className={`relative cursor-pointer ${
                  sectionSchoolActive ? "text-white" : ""
                }`}
                onClick={() => setSectionSchoolActive(true)}
              >
                Escola
              </span>
              <span
                className={`relative cursor-pointer ${
                  sectionSchoolActive ? "" : "text-white"
                }`}
                onClick={() => setSectionSchoolActive(false)}
              >
                Empresa
              </span>
            </div>
          </div>
          <span className="w-1/6">Tipo</span>
          <span className="w-1/6">Ação</span>
        </div>
        <div className="flex flex-col gap-2">
          {escolas.map((item, key) => (
            <div className="flex items-center text-sm font-medium" key={key}>
              <div className="w-4/6 flex gap-2 items-center">
                <div className="rounded-full bg-primary-300 p-2 text-white">
                  <MdSchool />
                </div>
                <span>{item.nome}</span>
              </div>
              <div className="w-1/6">{item.tipo}</div>
              <div className="w-1/6">
                <button
                  className="bg-green-400 text-white flex items-center gap-4 py-2 px-4 rounded-md cursor-pointer hover:bg-green-500 transition w-full"
                >
                  <MdAddCircleOutline className="text-2xl" />
                  <span>Nova venda</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewSell;
