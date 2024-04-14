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
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CreateCompanyModal = () => {
  const [clothing, setClothing] = useState<Uniform[]>([{name: "name", colors: "colors", sizes:"size", price:38}]);
  const [isOnCompanyPage, setIsOnCompanyPage] = useState(true);

  const { isOpen } = useAppSelector((state) => state.newcompany);

  const dispatch = useAppDispatch();

  const handleOnClose = () => {
    dispatch(onClose());
  };

  const handleRemoveClothing = () => {
    return;
  }
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

  const schemaClothing: ZodType<Uniform> = z.object({
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
    sizes: z
      .string()
      .min(1, "É necessário ao menos 1 tamanho.")
      .transform((tam) => {
        return tam
          .split(",")
          .map((word) => word.trim().toLocaleUpperCase())
          .join(",");
      }),
    colors: z
      .string()
      .min(1, "É necessário ao menos uma cor.")
      .transform((cor) => {
        return cor
          .split(",")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1)).trim();
          })
          .join(",");
      }),
    price: z.number().min(1, "É necessário inserir o preço do uniforme."),
  });

  const submitNewCompany = async (data: Company) => {
    try {
      console.log(data);
      const res = await createCompany(data);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const submitNewCloth = () => {
    return;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Company>({ resolver: zodResolver(schemaCompany) });

  const {
    register: registerClothing,
    handleSubmit: handleSubmitClothing,
    formState: { errors: errorsClothing },
  } = useForm<Uniform>({ resolver: zodResolver(schemaClothing) });

  //STYLE
  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";

  const registerClothingBody = (
    <form onSubmit={handleSubmitClothing(submitNewCloth)}>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nome da peça
          </label>
          <input
            type="text"
            className={`${inputStyle}`}
            placeholder="Camisa Manga Longa..."
            {...registerClothing("name")}
          />
          {errorsClothing.name && (
            <ErrorInput message={errorsClothing.name.message?.toString()} />
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
            {...registerClothing("colors")}
          ></textarea>
          {errorsClothing.colors && (
            <ErrorInput message={errorsClothing.colors.message?.toString()} />
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
            {...registerClothing("sizes")}
          ></textarea>
          {errorsClothing.sizes && (
            <ErrorInput message={errorsClothing.sizes.message?.toString()} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Preço
          </label>
          <textarea
            rows={2}
            className={`${inputStyle}`}
            placeholder="39.90"
            {...registerClothing("price")}
          ></textarea>
          {errorsClothing.price && (
            <ErrorInput message={errorsClothing.price.message?.toString()} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Vestuário
          </label>
          <div className={`${inputStyle}`}>
            {clothing ? (
               <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
               <thead className="uppercase">
                 <tr className="">
                   <th scope="col" className="px-6">
                     Nome Peça
                   </th>
                   <th scope="col" className="px-6">
                     Cores
                   </th>
                   <th scope="col" className="px-6">
                     Tamanhos
                   </th>
                   <th scope="col" className="px-6">
                     Preço
                   </th>
                   <th scope="col" className="px-6">
                     Ação
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {clothing.map((item, key) => (
                   <tr key={key}>
                     <th
                       scope="row"
                       className="px-6 py-4 font-medium whitespace-nowrap"
                     >
                       {item.name}
                     </th>
                     <td className="px-6 py-4">{item.colors}</td>
                     <td className="px-6 py-4">{item.sizes}</td>
                     <td className="px-6 py-4">
                       R$ {item.price.toFixed(2)}
                     </td>
                     <td className="px-6 py-4 flex gap-1">
                       <div className="text-xl cursor-pointer hover:text-black-600-p">
                         <FiEdit />
                       </div>
                       <div
                         className="text-xl cursor-pointer hover:text-black-600-p"
                         onClick={() => handleRemoveClothing()}
                       >
                         <FiTrash2 />
                       </div>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
            ) : (
              <div>Ainda não foi adicionada nenhuma peça ao vestuário...</div>
            )}
          </div>
        </div>
        <Button type="submit">Adicionar Item</Button>
      </div>
    </form>
  );

  const registerBody = (
    <form onSubmit={handleSubmit(submitNewCompany)}>
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
            : "before:translate-x-[100%] before:w-[55%]"
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
      {isOnCompanyPage ? registerBody : registerClothingBody}
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
