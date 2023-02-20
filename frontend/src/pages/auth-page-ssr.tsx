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



export const getServerSideProps = session.withSession((ctx) => {
  return {
    props: {
      session: ctx.req.session,
    },
  };
});
