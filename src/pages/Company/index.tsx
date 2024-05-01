import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//TYPES
import {
  Breadcrumb,
  Company as CompanyType,
  Sell,
} from "../../types/global.type";
import { getCompanyById } from "../../services/company.service";
import PageTitle from "../../components/PageTitle";
import Stock from "./Stock";
import { FiEdit } from "react-icons/fi";
import { useAppDispatch } from "../../redux/store";
import {
  onOpen as onOpenCompanyModal,
  onOpenEdit,
} from "../../redux/companyModal/slice";
import { findSellingsByCompanyAndDate } from "../../services/sell.service";

import Chart from "../../components/Chart";

const Company = () => {
  const { id } = useParams();

  const [company, setCompany] = useState<CompanyType>();
  const [pageSelected, setPageSelected] = useState("Geral");
  const [sellings, setSellings] = useState<Sell[]>([]);
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

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getSellingsOnWeek = async () => {
    try {
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      const lastDayOfWeek = new Date(today);

      // Primeiro dia da semana (Domingo)
      firstDayOfWeek.setDate(today.getDate() - today.getDay());
      const formattedFirstDayOfWeek = formatDate(firstDayOfWeek);

      // Último dia da semana (Sábado)
      lastDayOfWeek.setDate(today.getDate() - today.getDay() + 6);
      const formattedLastDayOfWeek = formatDate(lastDayOfWeek);

      if (id) {
        const res = await findSellingsByCompanyAndDate(
          id,
          formattedFirstDayOfWeek,
          formattedLastDayOfWeek
        );
        console.log(res);
        if (res != null) {
          setSellings(res.data ? res.data : []);
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


  //Recupera vendas da empresa na semana atual
  useEffect(() => {
    getSellingsOnWeek();
  }, []);

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
                "before:translate-x-0 before:w-[135px]"
              }
              ${
                pageSelected === "Estoque" &&
                "before:translate-x-full before:w-[135px]"
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
            </ul>
          </nav>

          <div>
            {pageSelected === "Geral" && (
              <div>
                <h2 className="text-xl font-medium cursor-pointer">Geral</h2>
                {sellings.length > 0 ? (
                  <div>
                    <Chart sellings={sellings} />
                  </div>
                ) : (
                  <div>Carregando vendas...</div>
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
