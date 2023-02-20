import { authSession } from "./authService";

export const session = {
        withSession(func) {
        return async (ctx) => {
          try {
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