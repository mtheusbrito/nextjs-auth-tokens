import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import nookies from 'nookies'
import React from "react";
import { tokenSerice } from "../services/auth/tokenService";

// import { Container } from './styles';
type Props ={
  token?: string
}
const AuthPageSSR: React.FC<Props> = ({token}) => {
  return (
    <div>
      <h1>Auth page SSR</h1>

      {JSON.stringify(token, null, 2)}
    </div>
  );
};

export default AuthPageSSR;


export const getServerSideProps = async (context: GetServerSidePropsContext) : Promise<GetServerSidePropsResult<Props>> => {

  const cookies = nookies.get(context);
  console.log(cookies)
  
  return {
    props:{
        token: tokenSerice.get({ctx: context})  
    }
  }

}