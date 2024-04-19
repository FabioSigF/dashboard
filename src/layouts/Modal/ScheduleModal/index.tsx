//HOOKS
import { useAppDispatch, useAppSelector } from "../../../redux/store";
//REDUX
import {
  onClose,
  onToggleAddedSuccessfully,
} from "../../../redux/scheduleModal/slice";
//ZOD + REACT HOOK FORMS
import { ZodType, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//COMPONENTS
import Modal from "..";
import ErrorInput from "../../../components/ErrorInput";
import Button from "../../../components/Button";
//SERVICE
import { createAppointment } from "../../../services/schedule.service";
//TYPES
import { Schedule } from "../../../types/global.type";
import { toast } from "react-toastify";

const ScheduleModal = () => {
  const { isOpen } = useAppSelector((state) => state.schedule);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

  const schemaSchedule: ZodType<Schedule> = z.object({
    title: z
      .string()
      .min(1, "O título não deve ser vazio.")
      .transform((item) => {
        return item.trim();
      }),
    type: z.string(),
    appointmentDate: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Schedule>({ resolver: zodResolver(schemaSchedule) });

  const submitNewAppointment = async (data: Schedule) => {
    try {
      await createAppointment(data);
      handleOnClose();
      dispatch(onToggleAddedSuccessfully());
    } catch (error) {
      console.log(error);
      toast.error("Ocorreu um erro ao criar o compromisso...");
    }
    return;
  };

  //STYLE
  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";

  const body = (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit(submitNewAppointment)}>
        <div className="flex flex-col gap-4 justify-center">
          <div>
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Título
            </label>
            <input
              type="text"
              className={`${inputStyle}`}
              placeholder="Vender em..."
              {...register("title")}
            />
            {errors.title && (
              <ErrorInput message={errors.title.message?.toString()} />
            )}
          </div>
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Categoria
            </label>
            <select className={`${inputStyle}`} {...register("type")}>
              <option value="">Selecione...</option>
              <option value="Venda">Venda</option>
              <option value="Compra">Compra</option>
              <option value="Entrega de Pedido">Entrega de Pedido</option>
              <option value="Reunião">Reunião</option>
              <option value="Contato">Contato</option>
              <option value="Outros">Outros</option>
            </select>
            {errors.type && (
              <ErrorInput message={errors.type.message?.toString()} />
            )}
          </div>
          <div>
            <label
              htmlFor="date"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Data
            </label>
            <input
              type="date"
              className={`${inputStyle}`}
              {...register("appointmentDate")}
            />
            {errors.appointmentDate && (
              <ErrorInput
                message={errors.appointmentDate.message?.toString()}
              />
            )}
          </div>
          <Button type="submit">Novo Compromisso</Button>
        </div>
      </form>
    </div>
  );
  return (
    <Modal
      title="Criar Novo Compromisso"
      body={body}
      onClose={() => handleOnClose()}
      isOpen={isOpen}
    />
  );
};

export default ScheduleModal;
