import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//TYPES
import { Breadcrumb, Company as CompanyType } from "../../types/global.type";
import { getCompanyById } from "../../services/company.service";
import PageTitle from "../../components/PageTitle";
import Stock from "./Stock";

const Company = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<CompanyType>();
  const [pageSelected, setPageSelected] = useState("Estoque");

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

  const handleChangePage = (value: string) => {
    setPageSelected(value);
  };
  //Recupera dados da empresa
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

  return (
    <div className="mx-6 my-6">
      {company ? (
        <div>
          <PageTitle title={company?.name} breadcrumb={breadcrumb} />
          <nav className="my-12">
            <ul
              className={`w-min flex gap-6 relative px-3 transition bg-gray-50 rounded-md py-2 before:absolute before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all 
              ${
                pageSelected === "Geral" &&
                "before:translate-x-0 before:w-[135px]"
              }
              ${
                pageSelected === "Estoque" &&
                "before:translate-x-full before:w-[135px]"
              }
              ${
                pageSelected === "Informações" &&
                "before:translate-x-[202%] before:w-[135px]"
              }
              `}
            >
              <li
                className={`relative cursor-pointer w-28 text-center ${
                  pageSelected === "Geral" ? "text-white" : ""
                }`}
                onClick={() => handleChangePage("Geral")}
              >
                Geral
              </li>
              <li
                className={`relative cursor-pointer w-28 text-center ${
                  pageSelected === "Estoque" ? "text-white" : ""
                }`}
                onClick={() => handleChangePage("Estoque")}
              >
                Estoque
              </li>
              <li
                className={`relative cursor-pointer w-28 text-center ${
                  pageSelected === "Informações" ? "text-white" : ""
                }`}
                onClick={() => handleChangePage("Informações")}
              >
                Informações
              </li>
            </ul>
          </nav>

          <div>
            {pageSelected === "Geral" && (
              <div>
                <h2 className="text-xl font-medium cursor-pointer">Geral</h2>
              </div>
            )}
            {pageSelected === "Estoque" && id && <Stock company_id={id} />}
            {pageSelected === "Informações" && (
              <div>
                <h2 className="text-xl font-medium cursor-pointer">
                  Informações
                </h2>
              </div>
            )}
          </div>
        </div>
      ) : (
        <span>Carregando empresa...</span>
      )}
    </div>
  );
};

export default Company;
