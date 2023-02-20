import { HttpClient } from "../../infra/httpClient/httpClient";
import { tokenService } from "./tokenService";

type LoginProps = {
  username: string;
  password: string;
};
export const authSession = {
  async login(props: LoginProps) {
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
        const data = await response.data;
        tokenService.save({ accessToken: data.access_token });
      }
    });
  },

  async getSession(ctx?: any) {
    const token = tokenService.get({ ctx });

    
      const { data, ok } = await HttpClient(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if(!ok){
        throw new Error("Não authorizado!");
      }
      return data;
  },
};
