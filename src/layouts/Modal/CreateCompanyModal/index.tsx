//REDUX
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { onClose } from "../../../redux/newCompanyModal/slice";

//COMPONENTS
import Modal from "..";
import Button from "../../../components/Button";
import ErrorInput from "../../../components/ErrorInput";

//ZOD AND REACT HOOK FORM IMPORT
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Company, Uniform } from "../../../types/global.type";
import { createCompany } from "../../../services/company.service";
import { useState } from "react";
import Clothing from "./Clothing";

const CreateCompanyModal = () => {
  const [clothing, setClothing] = useState<Uniform[]>([]);
  const [isOnCompanyPage, setIsOnCompanyPage] = useState(true);

  const { isOpen } = useAppSelector((state) => state.newcompany);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

  const submitNewCompany = async (data: Company) => {
    try {
      data.clothing = clothing;
      const res = await createCompany(data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  //REACT HOOK FORMS + ZOD
  const schemaCompany: ZodType<Company> = z.object({
    name: z
      .string()
      .min(1, "O nome não pode ser vazio.")
      .transform((item) => {
        return item
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    cnpj: z.string(),
    category: z.string().min(1, "O segmento não pode ser vazio."),
    tel: z.string(),
    cel: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>({ resolver: zodResolver(schemaCompany) });


  //STYLE
  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";


  const registerBody = (
    <form onSubmit={handleSubmit(submitNewCompany)}>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nome
          </label>
          <input
            type="text"
            className={`${inputStyle}`}
            placeholder="Padaria do Seu João..."
            {...register("name")}
          />
          {errors.name && (
            <ErrorInput message={errors.name.message?.toString()} />
          )}
        </div>
        <div>
          <label
            htmlFor="cnpj"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            CNPJ
          </label>
          <input
            type="text"
            className={`${inputStyle}`}
            placeholder="XX.XXX.XXX/XXXX-XX"
            {...register("cnpj")}
          />
          {errors.cnpj && (
            <ErrorInput message={errors.cnpj.message?.toString()} />
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Segmento
          </label>
          <select className={`${inputStyle}`} {...register("category")}>
            <option value="Alimentação e Bebidas">Alimentação e Bebidas</option>
            <option value="Construção">Construção</option>
            <option value="Educação">Educação</option>
            <option value="Entretenimento">Entretenimento</option>
            <option value="Informática">Informática</option>
            <option value="Saúde">Saúde</option>
            <option value="Serviços especializados">
              Serviços especializados
            </option>
            <option value="Serviços pessoais">Serviços pessoais</option>
            <option value="Vendas e marketing">Vendas e marketing</option>
            <option value="Vestuário e calçados">Vestuário e calçados</option>
            <option value="Outros">Outros</option>
          </select>
          {errors.category && (
            <ErrorInput message={errors.category.message?.toString()} />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="telefone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Telefone
            </label>
            <input
              type="text"
              className={`${inputStyle}`}
              placeholder="(34) 3223-3223"
              {...register("tel")}
            />
            {errors.tel && (
              <ErrorInput message={errors.tel.message?.toString()} />
            )}
          </div>
          <div>
            <label
              htmlFor="celular"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Celular
            </label>
            <input
              type="text"
              className={`${inputStyle}`}
              placeholder="(34) 9 9999-9999"
              {...register("cel")}
            />
            {errors.cel && (
              <ErrorInput message={errors.cel.message?.toString()} />
            )}
          </div>
        </div>
        <Button type="submit">Cadastrar Empresa</Button>
      </div>
    </form>
  );

  const body = (
    <div className="flex flex-col gap-2">
      {/*SWITCH BUTTON */}
      <div
        className={`w-min flex gap-6 relative px-3 transition bg-gray-50 rounded-md py-2 before:absolute before:w-[50%] before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all ${
          isOnCompanyPage
            ? "before:translate-x-0"
            : "before:translate-x-[100%] before:w-[50%]"
        }`}
      >
        <div
          className={`relative cursor-pointer ${
            isOnCompanyPage ? "text-white" : ""
          }`}
          onClick={() => setIsOnCompanyPage(true)}
        >
          Empresa
        </div>
        <div
          className={`relative cursor-pointer ${
            isOnCompanyPage ? "" : "text-white"
          }`}
          onClick={() => setIsOnCompanyPage(false)}
        >
          Vestuário
        </div>
      </div>
      {isOnCompanyPage ? registerBody : <Clothing clothing={clothing} setClothing={setClothing}/>}
    </div>
  );
  return (
    <Modal
      title="Cadastrar Nova Instituição"
      body={body}
      onClose={handleOnClose}
      isOpen={isOpen}
    />
  );
};

export default CreateCompanyModal;
