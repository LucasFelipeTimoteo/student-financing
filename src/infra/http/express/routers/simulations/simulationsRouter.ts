import { Router } from "express";
import type { SimulationsRouteHandler } from "../../routehandlers/simulations/simulationsRouteHandler";

export class SimulationsRouter {
	baseRoutePath = "/api";

	constructor(private simulationsRouteHandler: SimulationsRouteHandler) {
		this.#autoBindMethods(this.simulationsRouteHandler);
	}

	exec() {
		const router = Router();
		router.get(
			`${this.baseRoutePath}/simulations`,
			this.simulationsRouteHandler.getSimulations,
		);
		router.post(
			`${this.baseRoutePath}/simulations`,
			this.simulationsRouteHandler.createSimulation,
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
