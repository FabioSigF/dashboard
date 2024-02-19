import { useState } from "react";
import RegisterImage from "../../assets/images/register.svg";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import Button from "../../components/Button";

const Register = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center min-h-full w-full justify-between">
      <div className="w-2/5">
        <img src={RegisterImage} alt="Register" />
      </div>
      <div className="w-3/5 flex justify-center">
        <div className="w-3/5">
          <div className="mb-8 w-full flex flex-col items-center gap-8">
            <Logo />
            <div className="font-bold text-sm">Cadastre-se para fazer a sua empresa decolar!</div>
          </div>
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => handleSubmit(e)}
          >
            <Input title="Nome" id="name" type="text" setValue={setNameInput} />
            <Input
              title="Email"
              id="email"
              type="email"
              setValue={setEmailInput}
            />
            <Input
              title="Senha"
              id="name"
              type="text"
              setValue={setPasswordInput}
            />
            <Input
              title="Confirme a senha"
              id="name"
              type="text"
              setValue={setConfirmPasswordInput}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
