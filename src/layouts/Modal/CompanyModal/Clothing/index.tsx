//COMPONENTS
import Button from "../../../../components/Button";
import ErrorInput from "../../../../components/ErrorInput";

//ZOD AND REACT HOOK FORM IMPORT
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Uniform } from "../../../../types/global.type";
import { SetStateAction, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import { inputStyle } from "../../../../styles/input";

type Props = {
  clothing: Uniform[];
  setClothing: React.Dispatch<SetStateAction<Uniform[]>>;
};

const Clothing = ({ clothing, setClothing }: Props) => {
  const [idClothBeingEdited, setIdClothBeingEdited] = useState("");
  const [itsAnClothEdit, setItsAnClothEdit] = useState(false);

  const submitNewCloth = (data: Uniform) => {
    const newCloth = {
      name: data.name,
      //@ts-expect-error data.price vem como string e deve ser transformado em [string]
      sizes: data.sizes.split(","),
      //@ts-expect-error data.colors vem como string e deve ser transformado em [string]
      colors: data.colors.split(","),
      //@ts-expect-error data.price vem como string e deve ser transformado em number
      price: parseFloat(data.price),
    };
    setClothing((prev) => [...prev, newCloth]);

    reset({
      name: "",
      sizes: "",
      colors: "",
      price: 0,
    });

    toast.info("Item foi adicionado ao vestuário!");
    return;
  };

  const handleOnClickOnEditCloth = (item: Uniform) => {
    setItsAnClothEdit(true);
    reset({
      name: item.name,
      //@ts-expect-error item.sizes vem como array mas deve ser transformado em string
      sizes: item.sizes.join(", "),
      //@ts-expect-error item.colors vem como array mas deve ser transformado em string
      colors: item.colors.join(", "),
      //@ts-expect-error item.price vem como number mas deve ser transformado em string
      price: item.price.toString(),
    });
    if (item._id) setIdClothBeingEdited(item._id);
  };

  const handleOnEditCloth = (data: Uniform) => {
    console.log(data);
    setItsAnClothEdit(false);
    setClothing((prev) => {
      // Mapeie o array anterior, substituindo o item com o mesmo _id pelo novo item
      return prev.map((item) => {
        if (item._id === idClothBeingEdited) {
          return {
            _id: item._id,
            name: data.name,
            //@ts-expect-error data.price vem como string e deve ser transformado em [string]
            sizes: data.sizes.split(","),
            //@ts-expect-error data.colors vem como string e deve ser transformado em [string]
            colors: data.colors.split(","),
            //@ts-expect-error data.price vem como string e deve ser transformado em number
            price: parseFloat(data.price),
          };
        } else {
          return item; // Mantém os itens que não correspondem ao _id do novo item
        }
      });
    });

    reset({
      name: "",
      sizes: "",
      colors: "",
      price: 0,
    });

    toast.info("Item do vestuário foi editado!");
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
    reset,
  } = useForm<Uniform>({ resolver: zodResolver(schemaClothing) });

  return (
    <form
      onSubmit={
        itsAnClothEdit
          ? handleSubmit(handleOnEditCloth)
          : handleSubmit(submitNewCloth)
      }
    >
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
            type="text"
            className={`${inputStyle}`}
            placeholder="39.90"
            {...register("price")}
          />
          {errors.price && (
            <ErrorInput message={errors.price.message?.toString()} />
          )}
        </div>
        <Button type="submit">
          {itsAnClothEdit ? "Editar Item" : "Adicionar Item"}
        </Button>
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
                      <td className="px-6 py-4">
                        {
                          //@ts-expect-error Tipo colors é um array
                          item.colors.map((color, key) => (
                            <span key={key}>
                              {color}
                              {key !== item.colors.length - 1 && ", "}
                            </span>
                          ))
                        }
                      </td>
                      <td className="px-6 py-4">
                        {
                          //@ts-expect-error Tipo sizes é um array
                          item.sizes.map((size, key) => (
                            <span key={key}>
                              {size}
                              {key !== item.sizes.length - 1 && ", "}
                            </span>
                          ))
                        }
                      </td>
                      <td className="px-6 py-4">R$ {item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 flex gap-1">
                        <div
                          className="text-xl cursor-pointer hover:text-black-600-p"
                          onClick={() => handleOnClickOnEditCloth(item)}
                        >
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
      </div>
    </form>
  );
};

export default Clothing;
