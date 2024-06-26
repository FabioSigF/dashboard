import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//TYPES
import { Breadcrumb, Company } from "../../types/global.type";

//ICONS
import {
  MdSearch,
} from "react-icons/md";
import { TbBuildingStore, TbHanger, TbShoppingCartPlus } from "react-icons/tb";

//COMPONENTS
import PageTitle from "../../components/PageTitle";
import ActionButton from "../../components/ActionButton";

//REDUX
import { onOpen as onOpenNewCompanyModal } from "../../redux/companyModal/slice";
import { onOpen as onOpenStockModal } from "../../redux/stockModal/slice";
import { useAppDispatch } from "../../redux/store";

//Service
import { getAllCompanies } from "../../services/company.service";

const Business = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState<Company[]>([]);
  const [companies, setCompanies] = useState<Company[]>();

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

  const handleOnSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
    if (companies) {
      setFilteredItems(
        companies
          .filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  const dispatch = useAppDispatch();

  const handleOnAddCompany = () => {
    dispatch(onOpenNewCompanyModal());
  };

  const handleOnOpenStock = (idCompany: string) => {
    dispatch(onOpenStockModal({ idCompany: idCompany }));
  };


  const getCompanies = async () => {
    const res = await getAllCompanies();
    if (res != null) {
      setCompanies(res.sort((a, b) => a.name.localeCompare(b.name)));
      setFilteredItems(res.sort((a, b) => a.name.localeCompare(b.name)));
    }
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="mx-6 my-6">
      <PageTitle title="Comércio" breadcrumb={breadcrumb} />
      <div className="flex sm:flex-row flex-col sm:gap-16 gap-4 justify-between items-baseline mb-8 sm:mb-0">
        <form
          className="flex gap-2 items-center shadow-primary p-containerWBoxShadow rounded-lg relative w-full  mt-12 sm:mb-8 sm:max-w-[60%]"
          onSubmit={(e) => handleOnSearch(e)}
        >
          <MdSearch className="absolute" />
          <input
            type="text"
            className="w-full pl-6 text-sm"
            placeholder="Digite o nome da instituição..."
            value={searchTerm}
            onChange={(e) => handleOnSearch(e)}
          />
        </form>
        <ActionButton
          action={() => handleOnAddCompany()}
          extraCSS="py-4 font-medium w-full sm:w-fit"
        >
          Adicionar Instituição
        </ActionButton>
      </div>
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        <div className="overflow-auto">
          <div className="min-w-full whitespace-normal w-[600px]">
            <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
              <span className="w-2/6 md:w-3/6 font-bold text-sm">Empresa</span>
              <span className="w-1/6 font-bold text-sm">Categoria</span>
              <span className="w-3/6 md:w-2/6 font-bold text-sm">Ação</span>
            </div>
            <div>
              <div className="flex flex-col gap-2">
                {filteredItems ? (
                  filteredItems.map((item, key) => (
                    <div
                      className="flex items-center text-sm font-medium"
                      key={key}
                    >
                      <div
                        className="w-2/6 md:w-3/6 flex gap-2 items-center cursor-pointer hover:text-primary-400 transition"
                        onClick={() => navigate(`company/${item._id}`)}
                      >
                        <div className="rounded-full bg-primary-300 p-2 text-white text-lg">
                          <TbBuildingStore />
                        </div>
                        <span className="font-bold">{item.name}</span>
                      </div>
                      <div className="w-1/6">{item.category}</div>
                      <div className="w-3/6 md:w-2/6 flex gap-2">
                        <ActionButton
                          extraCSS="w-full"
                          action={() =>
                            handleOnOpenStock(item._id ? item._id : "")
                          }
                        >
                          <TbHanger className="text-2xl" />
                          <span>Ver estoque</span>
                        </ActionButton>
                        <ActionButton
                          bgColor="bg-green-400 hover:bg-green-500"
                          extraCSS="w-full"
                          action={() => {
                            navigate(`sell/${item._id}`);
                          }}
                        >
                          <TbShoppingCartPlus className="text-2xl" />
                          <span>Nova venda</span>
                        </ActionButton>
                      </div>
                    </div>
                  ))
                ) : (
                  <span className="text-sm text-gray-300">
                    Não foram encontradas empresas a partir da busca...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Business;
