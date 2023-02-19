import { HttpClient } from "../../infra/httpClient/httpClient";
import { tokenSerice } from "./tokenService";

type LoginProps = {
  username: string;
  password: string;
};
const login = async (props: LoginProps) => {
  await HttpClient(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
    {
      method: "POST",
    },
    { ...props }
  ).then(async (response) => {
    if (!response.ok) {
      throw new Error("Usuário ou senha inválido");
    } else {
      const data = await response.body;
      tokenSerice.save({accessToken: data.access_token});
    }
  });
};

export { login };
