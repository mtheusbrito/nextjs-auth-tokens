// Arquitetura exagonal
// Ports e Adapters

import { setCookie } from "nookies";
import { tokenService } from "../../services/auth/tokenService";

type Response = {
  data: any,
  ok: boolean
}
type FetchOptions<B> = Omit<RequestInit, 'body'> & {
  body?: B,
  refresh?: boolean,
  ctx?: any 

}
export async function HttpClient<B>(input: RequestInfo | URL, { refresh = false, ...rest}: FetchOptions<B>) : Promise<Response> {

  const options = { 
      ...rest,
      refresh: refresh,
      headers: { 
          'Content-Type': 'application/json',
          ...rest.headers,
      },
      body: rest.body ? JSON.stringify(rest.body) : null,
  };
  return fetch(input, options)
      .then(async (respostaDoServidor) => {
        
        const { data } = await respostaDoServidor.json()
        // console.log({url: input, refresh: refresh,ok: respostaDoServidor.ok, method: options.method, body: options.body, response: data, headers: options.headers})
          return {
              ok: respostaDoServidor.ok,
              status: respostaDoServidor.status,
              statusText: respostaDoServidor.statusText,
              data: data,
          }
      }).then(async (response)=>{

          if(!options.refresh) return response;
          if(response.status !== 401) return response;
          
         
    
          const isServer = Boolean(options?.ctx);
          console.log(`Passando no Middlwar isServer: ${isServer}`)

          if(!isServer){
            const refreshResponse = await HttpClient(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh`, {
              method: 'GET',
            })
            const newAccessToken = refreshResponse.data.access_token
            const newRefreshToken = refreshResponse.data.refresh_token

            tokenService.save({accessToken: newAccessToken })
            
            const retryResponse = await HttpClient(input, {...options, refresh: false, headers: {'Authorization': `Bearer ${newAccessToken}`}})
            //

             
            return retryResponse;
          }else{


            const {ACCESS_TOKEN: currentAccessToken, REFRESH_TOKEN : currentRefreshToken } = options?.ctx.req.cookies;
       
            
            let newAccessToken = '' 
            
            // try{
                const responseRefresh  = await HttpClient(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh`, {  
                method: "PUT" ,
                body: isServer ? { refresh_token: currentRefreshToken } : undefined })
                const { access_token : newAccessToken_, refresh_token: newRefreshToken }  = responseRefresh.data;
                newAccessToken = newAccessToken_
                console.log(`NEW_ACCESS_TOKEN: ${newAccessToken}`)
                console.log(`NEW_REFRESH_TOKEN: ${newRefreshToken}`)
                if(isServer){
                 
                  // saveRefreshToken(options?.ctx, newRefreshToken);
                  setCookie(options.ctx, 'REFRESH_TOKEN', newRefreshToken, {
                    // maxAge: 60 * 60 * 1, //1h
                    httpOnly: true,
                    sameSite: "lax",
                    path: "/",
                  });
                }
  
              // }catch(err){
              //   console.log(err)
              // }
                            
            
  
            //Guardar os tokens 
            
            tokenService.save({accessToken: newAccessToken, ctx: options?.ctx })
  
            // Tentar rodar o request anterior
            const retryResponse = await HttpClient(input, { ...options, refresh: false, headers: {'Authorization': `Bearer ${newAccessToken}`}})
  
            return retryResponse;
          }



          
      })
  
}
