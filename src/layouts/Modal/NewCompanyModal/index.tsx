import { useState } from "react";
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
import {
  NewCompanyModal as NewCompanyModalType,
  NewSchoolModal as NewSchoolModalType,
} from "../../../types/newCompanyModal.type";
import { Link } from "react-router-dom";

const NewCompanyModal = () => {
  const [isASchool, setIsASchool] = useState(true);

  const { isOpen } = useAppSelector((state) => state.newcompany);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

  //REACT HOOK FORMS + ZOD
  const schemaSchool: ZodType<NewSchoolModalType> = z.object({
    nome: z
      .string()
      .min(1, "O nome não pode ser vazio.")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    categoria: z.string().min(1, "A categoria não pode ser vazia."),
    cores: z.string().transform((cor) => {
      return cor
        .split(",")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1)).trim();
        })
        .join(" ");
    }),
    tamanhos: z
      .string()
      .min(1, "É necessário ao menos 1 tamanho.")
      .transform((tam) => {
        return tam
          .split(",")
          .map((word) => word.trim().toLocaleUpperCase())
          .join(",");
      }),
  });

  //REACT HOOK FORMS + ZOD
  const schemaCompany: ZodType<NewCompanyModalType> = z.object({
    nome: z
      .string()
      .min(1, "O nome não pode ser vazio.")
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    cnpj: z
      .string()
      .min(14, "O CPNJ não está completo.")
      .max(18, "O CNPJ é inválido."),
    segmento: z.string().min(1, "O segmento não pode ser vazio."),
    telefone: z.string(),
    celular: z.string(),
  });

  const submitNewSchool = (data: NewSchoolModalType) => {
    console.log("Funcionou Escola!");
  };
  const submitNewCompany = (data: NewCompanyModalType) => {
    console.log("Funcionou Empresa!");
  };

  const {
    register: regSchool,
    handleSubmit: handleSubmitSchool,
    formState: { errors: errorsSchool },
  } = useForm<NewSchoolModalType>({ resolver: zodResolver(schemaSchool) });

  const {
    register: regCompany,
    handleSubmit: handleSubmitCompany,
    formState: { errors: errorsCompany },
  } = useForm<NewCompanyModalType>({ resolver: zodResolver(schemaCompany) });

  //STYLE
  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";

  //BODY
  const schoolBody = (
    <form onSubmit={handleSubmitSchool(submitNewSchool)}>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Nome
          </label>
          <input
            type="text"
            className={`${inputStyle}`}
            placeholder="E. E ..."
            {...regSchool("nome")}
          />
          {errorsSchool.nome && (
            <ErrorInput message={errorsSchool.nome.message} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Categoria
          </label>
          <select className={`${inputStyle}`} {...regSchool("categoria")}>
            <option value="Pública">Pública</option>
            <option value="Privada">Privada</option>
          </select>
          {errorsSchool.categoria && (
            <ErrorInput message={errorsSchool.categoria.message} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Cores
          </label>
          <textarea
            rows={2}
            className={`${inputStyle}`}
            placeholder="Azul Marinho, Amarelo, Roxo..."
            {...regSchool("cores")}
          ></textarea>
          {errorsSchool.cores && (
            <ErrorInput message={errorsSchool.cores.message} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tamanhos
          </label>
          <textarea
            rows={2}
            className={`${inputStyle}`}
            placeholder="12, 14, P, M, G"
            {...regSchool("tamanhos")}
          ></textarea>
          {errorsSchool.tamanhos && (
            <ErrorInput message={errorsSchool.tamanhos.message} />
          )}
        </div>
        <Button type="submit">Cadastrar Escola</Button>
      </div>
    </form>
  );

  const companyBody = (
    <form onSubmit={handleSubmitCompany(submitNewCompany)}>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nome
          </label>
          <input
            type="text"
            className={`${inputStyle}`}
            placeholder="Padaria do Seu João..."
            {...regCompany("nome")}
          />
          {errorsCompany.nome && (
            <ErrorInput message={errorsCompany.nome.message} />
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
            {...regCompany("cnpj")}
          />
          {errorsCompany.cnpj && (
            <ErrorInput message={errorsCompany.cnpj.message} />
          )}
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Segmento
          </label>
          <select className={`${inputStyle}`} {...regCompany("segmento")}>
            <option value="Pública">Alimentação e Bebidas</option>
            <option value="Privada">Construção</option>
            <option value="Privada">Educação</option>
            <option value="Privada">Entretenimento</option>
            <option value="Privada">Informática</option>
            <option value="Privada">Saúde</option>
            <option value="Privada">Serviços especializados</option>
            <option value="Privada">Serviços pessoais</option>
            <option value="Privada">Vendas e marketing</option>
            <option value="Privada">Vestuário e calçados</option>
            <option value="Privada">Outros</option>
          </select>
          {errorsCompany.segmento && (
            <ErrorInput message={errorsCompany.segmento.message} />
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
              {...regCompany("telefone")}
            />
            {errorsCompany.telefone && (
              <ErrorInput message={errorsCompany.telefone.message} />
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
              {...regCompany("celular")}
            />
            {errorsCompany.celular && (
              <ErrorInput message={errorsCompany.celular.message} />
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
        className={`w-min flex gap-6 relative px-3 transition bg-gray-50 rounded-md py-2 before:absolute before:w-[45%] before:bg-primary-300 before:h-full before:rounded-md before:top-0 before:left-0 before:transition-all ${
          isASchool
            ? "before:translate-x-0"
            : "before:translate-x-[80%] before:w-[55%]"
        }`}
      >
        <Link
          to="new-sell?q=add-school"
          className={`relative cursor-pointer ${isASchool ? "text-white" : ""}`}
          onClick={() => setIsASchool(true)}
        >
          Escola
        </Link>
        <Link
          to="new-sell?q=add-company"
          className={`relative cursor-pointer ${isASchool ? "" : "text-white"}`}
          onClick={() => setIsASchool(false)}
        >
          Empresa
        </Link>
      </div>
      {isASchool ? schoolBody : companyBody}
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

export default NewCompanyModal;
