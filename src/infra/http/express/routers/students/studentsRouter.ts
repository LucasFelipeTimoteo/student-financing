import { Router } from "express";
import type { AuthRouteHandler } from "../../routehandlers/auth/authRoutehandler";

export class StudentsRouter {
  baseRoutePath = "/students";

  constructor(
    private authRoutehandler: AuthRouteHandler
  ) {
    this.#autoBindMethods(this.authRoutehandler);
  }

  exec() {
    const router = Router();
    router.post(`${this.baseRoutePath}/register`, this.authRoutehandler.register);


    return router;
  }

  /* biome-ignore lint/suspicious/noExplicitAny: */
  #autoBindMethods(instance: any): void {
    const prototype = Object.getPrototypeOf(instance);
    Object.getOwnPropertyNames(prototype)
      .filter((prop) => typeof instance[prop] === "function")
      .forEach((method) => {
        instance[method] = instance[method].bind(instance);
      });
  }
}
