import React from "react";

const HomeScreen: React.FC = () => {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          placeholder="Usuário"
          name="usuario"
          defaultValue="omariosouto"
        />
        <input
          placeholder="Senha"
          name="senha"
          type="password"
          defaultValue="safepassword"
        />
        <div>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default HomeScreen;
