import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { HttpClient } from "../infra/httpClient/httpClient";
import { tokenService } from "../services/auth/tokenService";

function MyApp({ Component, pageProps }: AppProps) {

    const router  = useRouter();


    const handlerLogout = async () =>{
        tokenService.delete({});
        await HttpClient(`${process.env.NEXT_PUBLIC_NEXT_URL}/api/refresh`, { method: 'DELETE'}, )
        router.push('/')
    }
    return (
        <>
        {router.pathname !== '/' && <button  onClick={handlerLogout} >
            Sair
            </button>}
        <Component {...pageProps} />
        </>
        );
  }
  
  export default MyApp;