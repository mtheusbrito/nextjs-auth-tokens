import { HttpClient } from "../../infra/httpClient/httpClient";
import { tokenService } from "./tokenService";

type LoginProps = {
  username: string;
  password: string;
};
export const authSession = {
  async login(props: LoginProps) {
    const { data , ok} = await HttpClient({url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, method: "POST", data: props})
        if(!ok){
          throw new Error("Usuário ou senha inválido");
        }
        const { refresh_token, access_token } = data; 
        tokenService.save({ accessToken: access_token })

       const { data :refreshData } = await HttpClient({url: `${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh`, method: "POST", data: {refresh_token}})
        console.log(refreshData)



        
  },

  async getSession(ctx?: any) {
    const token = tokenService.get({ ctx });
        const { data, ok } = await HttpClient({url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`,method: 'GET', headers:{"Authorization": `Bearer ${token}`} }
      );
      
      if(!ok){
        throw new Error("Não authorizado!");
      }
      return data;
  },
};
