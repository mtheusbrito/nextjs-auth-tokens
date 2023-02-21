import { HttpClient } from "../../infra/httpClient/httpClient";
import { getRefreshToken } from "../../pages/api/refresh";
import { tokenService } from "./tokenService";

type LoginProps = {
  username: string;
  password: string;
};
export const authSession = {
  async login(props: LoginProps) {
    const { data , ok } = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, { method: "POST", body: props as any})
        if(!ok){
          throw new Error("Usuário ou senha inválido");
        }
        const { refresh_token, access_token } = data; 
        tokenService.save({ accessToken: access_token })
        
        await HttpClient(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh`, {method: "POST", body: {refresh_token: refresh_token}})
        


        
  },

  async getSession(ctx?: any ) {
        const token = tokenService.get({ ctx });
        const { data, ok } = await HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, { 
        method: 'GET', 
        headers:{"Authorization": `Bearer ${token}`}, 
        refresh: true, 
        ctx: ctx});
      
      if(!ok){
        throw new Error("Não authorizado!");
      }
      return data;
  },
};
