import { mergeRouters, router } from "../server";
import * as authSignInRouter from "./auth-sign-in";
import * as categoryRouter from "./category";

export const routers = mergeRouters(
  router(authSignInRouter),
  router(categoryRouter)
);

export type Router = typeof routers;
