import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//TYPES
import { Breadcrumb, Company } from "../../types/global.type";

//ICONS
import {
  MdAddCircleOutline,
  MdBusiness,
  MdSearch,
  MdWarehouse,
} from "react-icons/md";

//COMPONENTS
import PageTitle from "../../components/PageTitle";
import ActionButton from "../../components/ActionButton";

//REDUX
import { onOpen as onOpenNewCompanyModal } from "../../redux/companyModal/slice";
import { onOpen as onOpenStockModal } from "../../redux/stockModal/slice";
import { useAppDispatch } from "../../redux/store";
import { getAllCompanies } from "../../services/company.service";

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

  const navigate = useNavigate();

  const handleOnSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const dispatch = useAppDispatch();

  const handleOnAddCompany = () => {
    dispatch(onOpenNewCompanyModal());
  };

  const handleOnOpenStock = () => {
    dispatch(onOpenStockModal());
  };

  const [companies, setCompanies] = useState<Company[]>();

  const getCompanies = async () => {
    const res = await getAllCompanies();
    if (res != null) {
      setCompanies(res);
    }
  };

  useEffect(() => {
    getCompanies();
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
        <ActionButton
          action={() => handleOnAddCompany()}
          extraCSS="py-4 font-medium"
        >
          Adicionar Instituição
        </ActionButton>
      </div>
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
          <span className="w-3/6">Empresa</span>
          <span className="w-1/6">Tipo</span>
          <span className="w-2/6">Ação</span>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            {companies ? (
              companies.map((item, key) => (
                <div
                  className="flex items-center text-sm font-medium"
                  key={key}
                >
                  <div className="w-3/6 flex gap-2 items-center cursor-pointer hover:text-primary-400 transition" onClick={()=>navigate(`company/${item._id}`)}>
                    <div className="rounded-full bg-primary-300 p-2 text-white">
                      <MdBusiness />
                    </div>
                    <span>{item.name}</span>
                  </div>
                  <div className="w-1/6">{item.category}</div>
                  <div className="w-2/6 flex gap-2">
                    <ActionButton extraCSS="w-full" action={handleOnOpenStock}>
                      <MdWarehouse className="text-2xl" />
                      <span>Ver estoque</span>
                    </ActionButton>
                    <ActionButton
                      bgColor="bg-green-400 hover:bg-green-500"
                      extraCSS="w-full"
                      action={() => {
                        navigate(`sell/${item._id}`);
                      }}
                    >
                      <MdAddCircleOutline className="text-2xl" />
                      <span>Nova venda</span>
                    </ActionButton>
                  </div>
                </div>
              ))
            ) : (
              <span className="text-sm text-gray-300">
                Carregando empresas...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
