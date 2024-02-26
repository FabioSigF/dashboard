import React, { useState } from "react";
import Modal from "..";
import Button from "../../../components/Button";

const NewInstitutionModal = () => {
  const [isASchool, setIsASchool] = useState(true);

  const inputStyle =
    "border border-gray-200 text-gray-900 text-sm rounded-md focus:ring-gray-600 focus:border-gray-400 block w-full p-2.5 bg-gray-50 outline-none";

  const handleOn = () => {};

  const schoolBody = (
    <form>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${inputStyle}`}
            placeholder="E. E ..."
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Categoria
          </label>
          <select id="category" className={`${inputStyle}`}>
            <option value="Pública">Pública</option>
            <option value="Privada">Privada</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cores
          </label>
          <textarea
            id="description"
            rows={2}
            className={`${inputStyle}`}
            placeholder="Azul Marinho, Amarelo, Roxo..."
          ></textarea>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tamanhos
          </label>
          <textarea
            id="description"
            rows={2}
            className={`${inputStyle}`}
            placeholder="12, 14, P, M, G"
          ></textarea>
        </div>
        <Button type="submit">Cadastrar Escola</Button>
      </div>
    </form>
  );

  const companyBody = (
    <form>
      <div className="flex flex-col gap-4 justify-center">
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`${inputStyle}`}
            placeholder="Padaria do Seu João..."
            required
          />
        </div>
        <div>
          <label
            htmlFor="cnpj"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            CNPJ
          </label>
          <input
            type="text"
            name="cnpj"
            id="cnpj"
            className={`${inputStyle}`}
            placeholder="XX.XXX.XXX/XXXX-XX"
            required
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Segmento
          </label>
          <select id="category" className={`${inputStyle}`}>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="telefone"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Telefone
            </label>
            <input
              type="text"
              name="telefone"
              id="telefone"
              className={`${inputStyle}`}
              placeholder="(34) 3223-3223"
            />
          </div>
          <div>
            <label
              htmlFor="celular"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Celular
            </label>
            <input
              type="text"
              name="celular"
              id="celular"
              className={`${inputStyle}`}
              placeholder="(34) 9 9999-9999"
              required
            />
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
        <span
          className={`relative cursor-pointer ${isASchool ? "text-white" : ""}`}
          onClick={() => setIsASchool(true)}
        >
          Escola
        </span>
        <span
          className={`relative cursor-pointer ${isASchool ? "" : "text-white"}`}
          onClick={() => setIsASchool(false)}
        >
          Empresa
        </span>
      </div>
      {isASchool ? schoolBody : companyBody}
    </div>
  );
  return (
    <Modal
      title="Cadastrar Nova Instituição"
      body={body}
      onClose={handleOn}
      isOpen={true}
    />
  );
};

export default NewInstitutionModal;
