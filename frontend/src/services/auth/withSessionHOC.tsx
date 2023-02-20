import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { authSession } from "./authService";

export const withSessionHOC = (Component: React.FC<{}> ) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [session, setSession] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEffect(() => {
      const getSession = async () => {
        try {
          const session = await authSession.getSession();
          setSession(session);
          setIsLoading(false);

          setData({ ...props, session: session });
        } catch (err) {
          setIsLoading(false);
          router.push("/?error=401");
        }
      };
      getSession();
    }, []);

    return !!session ? <Component {...data}/> : null;
  };

  return AuthenticatedComponent;
};
