import { Router } from "express";
import type { StudentRouteHandler } from "../../routehandlers/student/studentRouteHandler";

export class StudentRouter {
	baseRoutePath = "/api";

	constructor(private studentRouteHandler: StudentRouteHandler) {
		this.#autoBindMethods(this.studentRouteHandler);
	}

	exec() {
		const router = Router();
		router.post(
			`${this.baseRoutePath}/me`,
			this.studentRouteHandler.getStudent,
		);
		router.put(
			`${this.baseRoutePath}/me`,
			this.studentRouteHandler.editStudent,
		);

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
