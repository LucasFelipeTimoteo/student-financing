import type { NextFunction, Response } from "express";
import type { SimulationsController } from "../../../../../adapters/controllers/simulations/simulationsController";
import type {
	createSimulationExpressRequest,
	getSimumationsExpressRequest,
} from "./types/customSimulationRequest";

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

	async createSimulation(
		this: SimulationsRouteHandler,
		req: createSimulationExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const {
				accessToken,
				installmentsQuantity,
				interestPerMonth,
				totalValue,
			} = req.body;
			const getSimulationsResponse =
				await this.simulationsController.createSimulation(
					accessToken,
					installmentsQuantity,
					interestPerMonth,
					totalValue,
				);

			return res
				.status(getSimulationsResponse.status)
				.json(getSimulationsResponse.body);
		} catch (error) {
			next(error);
		}
	}
}
