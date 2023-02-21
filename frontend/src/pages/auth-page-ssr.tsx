import { GetServerSidePropsContext } from "next";
import React from "react";
import { session } from "../services/auth/session";


type Props = {
  session?: any;
};
const AuthPageSSR: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Auth page SSR</h1>

      {JSON.stringify(props, null, 2)}
    </div>
  );
};

export default AuthPageSSR;


// export const getServerSideProps = (ctx: GetServerSidePropsContext) =>{
//   return {
//     props:{
//       session: ctx.req.cookies 
//     }
//   }

// }
export const getServerSideProps = session.withSession((ctx : Partial<GetServerSidePropsContext> & { req:{
    session: any
}}) => {
  return {
    props: {
      session: ctx.req.cookies,
    },
  };
});
