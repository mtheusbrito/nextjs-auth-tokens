import { useRouter } from "next/router";
import React, { ChangeEvent, useState,FormEvent } from "react";

const HomeScreen: React.FC = () => {
  const [values, setValues] = useState({
    usuario: "mariosouto",
    senha: "safepassword",
  });
  const { push } = useRouter()
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

  const handleSubmit = (e: FormEvent) =>{
    e.preventDefault()
    push('/auth-page-ssr')
    
  }
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

        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
      </form>
    </div>
  );
};

export default HomeScreen;
