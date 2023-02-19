import { useRouter } from "next/router";
import React, { ChangeEvent, useState, FormEvent } from "react";
import { login } from "../services/auth/authServide";
const HomeScreen: React.FC = () => {
  const [values, setValues] = useState({
    usuario: "omariosouto",
    senha: "safepassword",
  });
  const { push } = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue,
      };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await login({
        username: values.usuario,
        password: values.senha,
      });
      push("/auth-page-ssr");
    } catch (err: any) {
      alert('Usuario ou senha estão inválidos');
      
    }
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuário"
          name="usuario"
          value={values.usuario}
          onChange={handleChange}
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          value={values.senha}
          onChange={handleChange}
        />
        <div>
          <button>Entrar</button>
        </div>

        <pre>{JSON.stringify(values, null, 2)}</pre>
      </form>
    </div>
  );
};

export default HomeScreen;
