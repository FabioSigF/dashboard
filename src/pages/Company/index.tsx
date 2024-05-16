///React
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//TYPES
import { Breadcrumb, Company as CompanyType } from "../../types/global.type";

//Services
import { getCompanyById } from "../../services/company.service";

//Components
import Stock from "./Stock";
import PageTitle from "../../components/PageTitle";
import CardSellings from "../../components/Card/CardSellings";

//Icons
import { FiEdit } from "react-icons/fi";

//Reudx
import { useAppDispatch } from "../../redux/store";
import {
  onOpen as onOpenCompanyModal,
  onOpenEdit,
} from "../../redux/companyModal/slice";
import Sellings from "../Sellings";
import BestSellingClothes from "../../components/Charts/ChartBestSellingClothes";

const Company = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<CompanyType>();
  const [pageSelected, setPageSelected] = useState("Geral");
  const dispatch = useAppDispatch();

  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Início",
      link: "#!",
    },
    {
      title: "Comércio",
      link: "#!",
    },
    {
      title: "Empresa",
      link: "#!",
    },
  ];

  //Change Selected Page between Geral and Estoque
  const handleChangePage = (value: string) => {
    setPageSelected(value);
  };

  const getCompany = async () => {
    try {
      if (id) {
        const res = await getCompanyById(id);
        if (res != null) {
          setCompany(res);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Recupera dados da empresa
  useEffect(() => {
    getCompany();
  }, [id, company]);

  const handleOnEditCompany = (company: CompanyType) => {
    dispatch(onOpenEdit(company));
    dispatch(onOpenCompanyModal());
  };

  return (
    <div className="mx-6 my-6">
      {company ? (
        <div>
          <PageTitle title={company?.name} breadcrumb={breadcrumb} />
          <div
            className="flex items-center gap-2 mt-4 cursor-pointer hover:text-primary-300 transition"
            onClick={() => handleOnEditCompany(company)}
          >
            Editar Empresa
            <FiEdit />
          </div>
          <nav className="my-12">
            <ul
              className={`w-min flex gap-6 relative px-3 transition bg-gray-50 rounded-md py-2 before:absolute before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all 
              ${
                pageSelected === "Geral" &&
                "before:translate-x-0 before:w-[90px] xs:before:w-[135px]"
              }
              ${
                pageSelected === "Estoque" &&
                "before:translate-x-full before:w-[90px] xs:before:w-[135px]"
              }
              `}
            >
              <li
                className={`relative cursor-pointer w-16 xs:w-28 text-center ${
                  pageSelected === "Geral" ? "text-white" : ""
                }`}
                onClick={() => handleChangePage("Geral")}
              >
                Geral
              </li>
              <li
                className={`relative cursor-pointer w-16 xs:w-28 text-center ${
                  pageSelected === "Estoque" ? "text-white" : ""
                }`}
                onClick={() => handleChangePage("Estoque")}
              >
                Estoque
              </li>
            </ul>
          </nav>

          <div>
            {pageSelected === "Geral" && (
              <div>
                {id ? (
                  <div className="flex flex-col gap-12">
                    <div className="md:grid md:grid-cols-5 md:gap-8">
                      <div className="col-span-3 max-md:mb-12">
                        <CardSellings chartRangeType="month" company_id={id} />
                      </div>
                      <div className="col-span-2">
                        <Sellings isAWidget />
                      </div>
                    </div>
                    <div className="md:grid md:grid-cols-5 md:gap-8">
                      <div className="col-span-2 max-md:mb-12">
                        <BestSellingClothes />
                      </div>
                      <div className="col-span-3">
                        <CardSellings chartRangeType="year" company_id={id} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>Carregando...</div>
                )}
              </div>
            )}
            {pageSelected === "Estoque" && id && <Stock company_id={id} />}
          </div>
        </div>
      ) : (
        <span>Carregando empresa...</span>
      )}
    </div>
  );
};

export default Company;
