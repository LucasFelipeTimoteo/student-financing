import type { NextFunction, Response } from "express";
import type { SimulationsController } from "../../../../../adapters/controllers/simulations/simulationsController";
import type { getSimumationsExpressRequest } from "./types/customSimulationRequest";

export class SimulationsRouteHandler {
	constructor(private simulationsController: SimulationsController) {}

	async getSimulations(
		this: SimulationsRouteHandler,
		req: getSimumationsExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { accessToken } = req.body;
			const getSimulationsResponse =
				await this.simulationsController.getSimulations(accessToken);

			return res
				.status(getSimulationsResponse.status)
				.json(getSimulationsResponse.body);
		} catch (error) {
			next(error);
		}
	}
}
