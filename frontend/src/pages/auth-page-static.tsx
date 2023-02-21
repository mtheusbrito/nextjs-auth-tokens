import { GetStaticPropsContext } from "next";
import React, { useEffect, useState } from "react";
import { tokenService } from "../services/auth/tokenService";
import { withSessionHOC } from "../services/auth/withSessionHOC";


type Props = {
  msg: string,
  session: any
}
const AuthPageStatic: React.FC<Props> = (props) => {
  const [tokens, setTokens] = useState<object>(null)

  
  useEffect(()=>{
    setTokens(tokenService.getAll({ctx: null}))

  },[])
  return (
    <div>
      <h1>Auth page Static</h1>
      <p>{JSON.stringify(tokens, null, 2)}</p>
    </div>
  );
};

export default withSessionHOC(AuthPageStatic);

export const getStaticProps = (ctx: GetStaticPropsContext) =>{
  return {
    props:{
      msg: ''
    }
  }

}
