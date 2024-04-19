import { useEffect, useState } from "react";
import {
  MdAddCircleOutline,
  MdGroup,
  MdOutlineCreditCard,
  MdOutlineShoppingBag,
} from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import { Breadcrumb, Schedule as ScheduleType } from "../../types/global.type";
import ActionButton from "../../components/ActionButton";
import { FiEdit, FiSquare, FiTrash2, FiCheckSquare } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  onOpen,
  onToggleAddedSuccessfully,
  onToggleUpdate,
  onToggleUpdatedSuccessfully,
} from "../../redux/scheduleModal/slice";
import {
  checkScheduleItem,
  deleteScheduleItem,
  getAllSchedule,
  uncheckScheduleItem,
} from "../../services/schedule.service";
import { toast } from "react-toastify";
import { FaShippingFast } from "react-icons/fa";

type Props = {
  isAWidget?: boolean;
};
const Schedule = ({ isAWidget }: Props) => {
  const { addedSuccessfully, updatedSuccessfully } = useAppSelector(
    (state) => state.schedule
  );

  const [compromissos, setCompromissos] = useState<ScheduleType[]>();

  const handleIconTypeBgColorConfig = (type: string) => {
    switch (type) {
      case "Venda":
        return "bg-green-400";
      case "Compra":
        return "bg-red-500";
      case "Entrega":
        return "bg-yellow-400";
      case "Reunião":
        return "bg-blue-400";
      case "Contato":
        return "bg-cyan-400";
      case "Outros":
        return "bg-gray-400";
    }
  };

  const handleIconTypeConfig = (type: string) => {
    switch (type) {
      case "Venda":
        return <MdOutlineShoppingBag />;
      case "Compra":
        return <MdOutlineCreditCard />;
      case "Entrega":
        return <FaShippingFast />;
      case "Reunião":
        return <MdGroup />;
      case "Contato":
        return <MdGroup />;
      case "Outros":
        return <MdGroup />;
    }
  };

  function mostraData(tempo: string) {
    const date = new Date(tempo);
    return `${date.getDate()}/${
      date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth()
    }/${date.getFullYear()}`;
  }

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

  const dispatch = useAppDispatch();

  const handleOnCreateAppointment = () => {
    dispatch(onOpen());
  };

  const getSchedule = async () => {
    const res = await getAllSchedule();
    if (res != null) setCompromissos(res);
  };

  const handleDeleteAppointment = async (id: string) => {
    try {
      await deleteScheduleItem(id);
      toast.success("Compromisso deletado com sucesso!");
      getSchedule();
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao excluir o compromisso...");
    }
  };

  const handleCompleteAppointment = async (id: string, status: boolean) => {
    try {
      if (status) {
        await uncheckScheduleItem(id);
      } else {
        await checkScheduleItem(id);
      }
      getSchedule();
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao tentar completar o compromisso...");
    }
  };

  const handleOnUpdateAppointment = async (item: ScheduleType) => {
    console.log();
    dispatch(
      onToggleUpdate({
        id: item._id,
        title: item.title,
        type: item.type,
        date: new Date(item.appointmentDate).toISOString(),
      })
    );
    dispatch(onOpen());
  };
  useEffect(() => {
    getSchedule();
  }, []);

  useEffect(() => {
    if (addedSuccessfully) {
      getSchedule();
      toast.success("Compromisso adicionado com sucesso!");
      dispatch(onToggleAddedSuccessfully());
    }
  }, [addedSuccessfully]);

  useEffect(() => {
    if (updatedSuccessfully) {
      getSchedule();
      toast.success("Compromisso atualizado com sucesso!");
      dispatch(onToggleUpdatedSuccessfully());
    }
  }, [updatedSuccessfully]);

  return (
    <div className={`${!isAWidget && "mx-6 my-6"}`}>
      {!isAWidget && (
        <div className="flex justify-between items-start mb-12">
          <PageTitle title="Agenda" breadcrumb={breadcrumb} />
          <ActionButton
            bgColor="bg-green-400 hover:bg-green-500"
            action={handleOnCreateAppointment}
          >
            <MdAddCircleOutline className="text-2xl" />
            <span>Novo Compromisso</span>
          </ActionButton>
        </div>
      )}
      <div className="shadow-primary p-containerWBoxShadow rounded-lg">
        {!isAWidget ? (
          <div className="flex items-center pb-4 mb-4 border-b">
            <span className="w-3/6 font-bold">Compromisso</span>
            <span className="w-1/6 font-bold">Categoria</span>
            <span className="w-1/6 font-bold">Data</span>
            <span className="w-1/6 font-bold">Ação</span>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2 mb-8">
                <h2 className="text-xl font-medium">Agenda</h2>
                <p className="text-gray-400 text-sm">Próximos Compromissos</p>
              </div>
              <ActionButton
                bgColor="bg-green-400 hover:bg-green-500"
                action={handleOnCreateAppointment}
              >
                <MdAddCircleOutline className="text-2xl" />
                <span>Novo Compromisso</span>
              </ActionButton>
            </div>
            <div className="flex items-center pb-4 mb-4 border-b">
              <span className="w-4/6 font-bold">Compromisso</span>
              <span className="w-1/6 font-bold">Categoria</span>
              <span className="w-1/6 font-bold">Data</span>
            </div>
          </>
        )}
        <div className="flex flex-col gap-2">
          {compromissos ? (
            !isAWidget ? (
              compromissos
                .sort((a, b) => {
                  // Ordena por data
                  const dateA = new Date(a.appointmentDate);
                  const dateB = new Date(b.appointmentDate);
                  if (dateA < dateB) return -1;
                  if (dateA > dateB) return 1;
                  return 0;
                })
                .sort((a, b) => {
                  // Move os compromissos marcados como concluídos para o final
                  if (a.isDone && !b.isDone) return 1;
                  if (!a.isDone && b.isDone) return -1;
                  return 0;
                })
                .map((item, key) => (
                  <div
                    className={`flex items-center ${
                      item.isDone && "opacity-50"
                    }`}
                    key={key}
                  >
                    <div className="w-3/6 flex gap-4 items-center text-sm">
                      <div
                        className={`rounded-md ${handleIconTypeBgColorConfig(
                          item.type
                        )} text-white w-[40px] h-[40px] flex items-center justify-center`}
                      >
                        {handleIconTypeConfig(item.type)}
                      </div>
                      <div
                        className={`flex flex-col font-medium ${
                          item.isDone && "line-through"
                        }`}
                      >
                        <span>{item.title}</span>
                      </div>
                    </div>
                    <div className="w-1/6 text-sm">{item.type}</div>
                    <div className="w-1/6 text-sm">
                      {mostraData(item.appointmentDate)}
                    </div>

                    <div className="w-1/6 text-sm flex items-center gap-2">
                      <div
                        className="text-xl cursor-pointer hover:text-black-600-p"
                        onClick={() => handleOnUpdateAppointment(item)}
                      >
                        <FiEdit />
                      </div>
                      <div
                        className="text-xl cursor-pointer hover:text-black-600-p"
                        onClick={() =>
                          handleDeleteAppointment(item._id ? item._id : "")
                        }
                      >
                        <FiTrash2 />
                      </div>
                      <div
                        className="text-xl cursor-pointer hover:text-black-600-p"
                        onClick={() =>
                          handleCompleteAppointment(
                            item._id ? item._id : "",
                            item.isDone ? true : false
                          )
                        }
                      >
                        {item.isDone ? <FiCheckSquare /> : <FiSquare />}
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              compromissos
                .filter((item) => !item.isDone)
                .slice(0, 5)
                .sort((a, b) => {
                  // Ordena por data
                  const dateA = new Date(a.appointmentDate);
                  const dateB = new Date(b.appointmentDate);
                  if (dateA < dateB) return -1;
                  if (dateA > dateB) return 1;
                  return 0;
                })
                .map((item, key) => (
                  <div
                    className={`flex items-center ${
                      item.isDone && "opacity-50"
                    }`}
                    key={key}
                  >
                    <div className="w-4/6 flex gap-4 items-center text-sm">
                      <div
                        className={`rounded-md ${handleIconTypeBgColorConfig(
                          item.type
                        )} text-white w-[40px] h-[40px] flex items-center justify-center`}
                      >
                        {handleIconTypeConfig(item.type)}
                      </div>
                      <div
                        className={`flex flex-col font-medium ${
                          item.isDone && "line-through"
                        }`}
                      >
                        <span>{item.title}</span>
                      </div>
                    </div>
                    <div className="w-1/6 text-sm">{item.type}</div>
                    <div className="w-1/6 text-sm">
                      {mostraData(item.appointmentDate)}
                    </div>
                  </div>
                ))
            )
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
