import { HttpClient } from "../../infra/httpClient/httpClient";

type LoginProps = {
  username: string;
  password: string;
};
const login = async (props: LoginProps) => {
  await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
    method: "POST",
    
  }, {...props}).then(async (response) => {
    if (!response.ok) {
      throw new Error("Usuário ou senha inválido");
    } else {
      console.log(await response.body);
    }
  });
};

export { login };
