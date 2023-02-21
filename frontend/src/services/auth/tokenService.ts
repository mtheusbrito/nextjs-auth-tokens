const ACCESS_TOKEN = "ACCESS_TOKEN";
const REFRESH_TOKEN = 'REFRESH_TOKEN'
import { NextPageContext } from "next";
import nookies, { parseCookies, setCookie } from "nookies";
interface Context extends NextPageContext {
  // any modifications to the default context, e.g. query types
}
const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;
export const tokenService = {
  save({ accessToken, ctx = null }: { accessToken: string; ctx?: any }): void {
    // globalThis?.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    // globalThis?.sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      setCookie(ctx, ACCESS_TOKEN, accessToken, {
      maxAge: ONE_YEAR,
      path: "/",
    });
  },
  get({ ctx = null }: { ctx?: any }): string {
    const { 'ACCESS_TOKEN' : accessToken } = parseCookies(ctx ? ctx : {});
    return accessToken || '';
  },
  getAll({ ctx = null }: { ctx?: any }): object {
    const tokens = parseCookies(ctx ? ctx : {});
    return tokens ;
  },
  delete({ctx = null} : {ctx?: any}): void {
    // globalThis?.localStorage.removeItem(ACCESS_TOKEN_KEY);
    // globalThis?.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    nookies.destroy(ctx, ACCESS_TOKEN)
  },
};
