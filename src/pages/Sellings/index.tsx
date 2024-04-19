//COMPONENTS
import { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { getAllSellings } from "../../services/sell.service";
import { Breadcrumb, SellItem } from "../../types/global.type";
import { Sellings as SellingsType } from "../../types/global.type";
import { IoShirtOutline } from "react-icons/io5";
type Props = {
  isAWidget?: boolean;
};

const Sellings = ({ isAWidget }: Props) => {
  const [sellings, setSellings] = useState<SellingsType[]>();

  const breadcrumb: Array<Breadcrumb> = [
    {
      title: "Aplicativos",
      link: "/app",
    },
    {
      title: "Vendas Recentes",
      link: "/app/sellings",
    },
  ];

  const getSellings = async () => {
    // @ts-expect-error - Os dados de Sellings estão em response{}
    const res = await getAllSellings().then((res) => res.response);
    console.log(res);
    if (res != null) setSellings(res);
  };

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
      return (diferencaTempo / 60).toFixed(0) > "1" ? `${(diferencaTempo / 60).toFixed(0)} horas` : `${(diferencaTempo / 60).toFixed(0)} hora`;
    } else {
      return `${dataTempo.getDate()}/${
        dataTempo.getMonth() < 10
          ? `0${dataTempo.getMonth()}`
          : dataTempo.getMonth()
      }/${dataTempo.getFullYear()}`;
    }
  }

  function showSellDetails(item: SellItem[]) {
    if (item) {
      const string: string = item
        .map((item) => `${item.amount} ${item.name} ${item.size} ${item.color}`)
        .join(", ");
      if (string.length > 45) {
        return `${string.slice(0, 45)}...`;
      } else return string;
    }
  }

  useEffect(() => {
    getSellings();
  }, []);

  return (
    <div className={`${!isAWidget && "mx-6 my-6"}`}>
      {!isAWidget && (
        <div className="flex justify-between items-start mb-12">
          <PageTitle title="Vendas Recentes" breadcrumb={breadcrumb} />
        </div>
      )}
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        {isAWidget && (
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-xl font-medium">Vendas Recentes</h2>
            <p className="text-gray-400 text-sm">Últimas Vendas Realizadas</p>
          </div>
        )}
        <div className="flex items-center pb-4 mb-4 border-b border-gray-300">
          <span className="w-4/6 text-sm font-bold">Produto</span>
          <span className="w-1/6 text-sm font-bold">Preço</span>
          <span className="w-1/6 text-sm font-bold">Data</span>
        </div>

        <div className="flex flex-col gap-2">
          {sellings &&
            sellings.map((sell, key) => (
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
                    <span className="text-sm font-medium">
                      {sell.company_name}
                    </span>
                    <span className="text-gray-400 text-xs overflow-hidden">
                      {!isAWidget ? (
                        <span>
                          {sell.items.map((item, key) => (
                            <span key={key}>
                              {item.amount} {item.name} {item.size} {item.color}
                              {key !== sell.items.length - 1 && ", "}
                            </span>
                          ))}
                        </span>
                      ) : (
                        <>{showSellDetails(sell.items)}</>
                      )}
                    </span>
                  </div>
                </div>
                <div className="w-1/6 text-sm">
                  R$ {sell.total_price.toFixed(2)}
                </div>
                <div className="w-1/6 text-sm">
                  {calculaTempo(sell.date.toString())}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Sellings;
