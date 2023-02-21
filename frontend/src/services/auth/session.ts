import { authSession } from "./authService";

export const session = {
        withSession(func) {
        return async (ctx) => {
          try {
            // const {ACCESS_TOKEN, REFRESH_TOKEN } = ctx.req.cookies;
            // console.log(`Cookies no contexto :session:`)
            // console.log(`ACCESS_TOKEN: ${ACCESS_TOKEN}` )
            // console.log(`REFRESH_TOKEN: ${REFRESH_TOKEN}`)

            const session = await authSession.getSession(ctx);
      
            const modifieldCtx = {
              ...ctx,
              req: {
                ...ctx.req,
                session: session,
              },
            };
            return func(modifieldCtx);
          } catch (err) {
            return {
              redirect: {
                permanent: false,
                destination: "/?error=401",
              },
            };
          }
        };
      }
}