import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { session } from "../services/auth/session";


type Props = {
  session?: any;
};
const AuthPageSSR: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Auth page SSR</h1>

      <p>{JSON.stringify(props, null, 2)}</p>
      <Link href={'/auth-page-static'}>
        <a>Auth Page Static</a>
      </Link>


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
