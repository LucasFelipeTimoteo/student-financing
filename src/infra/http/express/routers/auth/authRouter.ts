import { Router } from "express";
import type { AuthRouteHandler } from "../../routehandlers/auth/authRoutehandler";

export class AuthRouter {
	baseRoutePath = "/api";

	constructor(private authRouteHandler: AuthRouteHandler) {
		this.#autoBindMethods(this.authRouteHandler);
	}

	exec() {
		const router = Router();
		router.post(
			`${this.baseRoutePath}/register`,
			this.authRouteHandler.register,
		);
		router.post(`${this.baseRoutePath}/login`, this.authRouteHandler.login);

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
