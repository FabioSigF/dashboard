import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//TYPES
import { Breadcrumb, School } from "../../types/global.type";

//ICONS
import {
  MdAddCircleOutline,
  MdSchool,
  MdSearch,
  MdWarehouse,
} from "react-icons/md";

//COMPONENTS
import PageTitle from "../../components/PageTitle";
import Button from "../../components/Button";
import ActionButton from "../../components/ActionButton";

//REDUX
import { onOpen as onOpenNewCompanyModal } from "../../redux/newCompanyModal/slice";
import { onOpen as onOpenStockModal } from "../../redux/stockModal/slice";
import { useAppDispatch } from "../../redux/store";
import { getAllSchools } from "../../services/school.service";

const Business = () => {
  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Aplicativos",
      link: "/app",
    },
    {
      title: "Comércio",
      link: "/app/business",
    },
  ];

  const [sectionSchoolActive, setSectionSchoolActive] = useState(true);

  const navigate = useNavigate();

  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const dispatch = useAppDispatch();

  const handleOnAddCompany = () => {
    dispatch(onOpenNewCompanyModal());
    navigate("?q=add-school");
  };

  const handleOnOpenStock = () => {
    dispatch(onOpenStockModal());
  };

  const [schools, setSchools] = useState<School[]>();

  const getSchools = async () => {
    const res = await getAllSchools();

    if (res != null) {
      setSchools(res);
    }
  };
  useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="mx-6 my-6">
      <PageTitle title="Comércio" breadcrumb={breadcrumb} />
      <div className="flex gap-16 justify-between items-baseline">
        <form
          className="flex gap-2 items-center shadow-primary p-containerWBoxShadow rounded-lg relative w-full  mt-12 mb-8 max-w-[60%]"
          onSubmit={(e) => handleOnSearch(e)}
        >
          <MdSearch className="absolute" />
          <input
            type="text"
            className="w-full pl-6 text-sm"
            placeholder="Digite o nome da instituição..."
          />
        </form>
        <div onClick={() => handleOnAddCompany()}>
          <Button type="button">Adicionar Instituição</Button>
        </div>
      </div>
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
          <div className="w-3/6">
            <div
              className={`w-min flex gap-6 relative px-3 transition bg-gray-50 rounded-md py-2 before:absolute before:w-[45%] before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all ${
                sectionSchoolActive
                  ? "before:translate-x-0"
                  : "before:translate-x-[80%] before:w-[55%]"
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
          <span className="w-2/6">Ação</span>
        </div>
        <div className="flex flex-col gap-2">
          {schools ? (
            schools.map((item, key) => (
              <div className="flex items-center text-sm font-medium" key={key}>
                <div className="w-3/6 flex gap-2 items-center">
                  <div className="rounded-full bg-primary-300 p-2 text-white">
                    <MdSchool />
                  </div>
                  <span>{item.name}</span>
                </div>
                <div className="w-1/6">{item.category}</div>
                <div className="w-2/6 flex gap-2">
                  <ActionButton extraCSS="w-full">
                    <MdWarehouse className="text-2xl" />
                    <span onClick={() => handleOnOpenStock()}>Ver estoque</span>
                  </ActionButton>
                  <ActionButton
                    bgColor="bg-green-400 hover:bg-green-500"
                    extraCSS="w-full"
                  >
                    <MdAddCircleOutline className="text-2xl" />
                    <span>Nova venda</span>
                  </ActionButton>
                </div>
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-300">Carregando escolas...</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Business;
