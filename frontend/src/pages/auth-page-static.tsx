import React from "react";
import { withSessionHOC } from "../services/auth/withSessionHOC";


type Props = {
  msg: string,
  session: any
}
const AuthPageStatic: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>Auth page Static</h1>
      <p>{JSON.stringify(props, null, 2)}</p>
    </div>
  );
};

export default withSessionHOC(AuthPageStatic);

export const getStaticProps = () =>{
  return {
    props:{
      msg: 'teste'
    }
  }

}
