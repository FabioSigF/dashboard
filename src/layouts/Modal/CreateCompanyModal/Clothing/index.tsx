//COMPONENTS
import Button from "../../../../components/Button";
import ErrorInput from "../../../../components/ErrorInput";

//ZOD AND REACT HOOK FORM IMPORT
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Uniform } from "../../../../types/global.type";
import { SetStateAction } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

type Props = {
  clothing: Uniform[],
  setClothing: React.Dispatch<SetStateAction<Uniform[]>>;
};

const Clothing = ({ clothing, setClothing }: Props) => {
  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";

  const submitNewCloth = (data: Uniform) => {
    //@ts-expect-error data.price é incluído como string e será transformado em float
    data.price = parseFloat(data.price)
    setClothing((prev )=>[...prev, data]);
    return;
  };

  const handleRemoveClothing = () => {
    return;
  };

  //@ts-expect-error Price estava bugando como number
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
    price: z.string().min(1, "É necessário inserir o preço do uniforme."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Uniform>({ resolver: zodResolver(schemaClothing) });

  return (
    <form onSubmit={handleSubmit(submitNewCloth)}>
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
            {...register("name")}
          />
          {errors.name && (
            <ErrorInput message={errors.name.message?.toString()} />
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
            {...register("colors")}
          ></textarea>
          {errors.colors && (
            <ErrorInput message={errors.colors.message?.toString()} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tamanhos
          </label>
          <input
            className={`${inputStyle}`}
            placeholder="12, 14, P, M, G"
            {...register("sizes")}
          />
          {errors.sizes && (
            <ErrorInput message={errors.sizes.message?.toString()} />
          )}
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Preço
          </label>
          <input
            type="number"
            className={`${inputStyle}`}
            placeholder="39.90"
            {...register("price")}
          />
          {errors.price && (
            <ErrorInput message={errors.price.message?.toString()} />
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
                      <td className="px-6 py-4">R$ {item.price.toFixed(2)}</td>
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
};

export default Clothing;
