import type { logger } from "../../../application/logger/logger";
import type { SimulationsRepository } from "../../../application/repository/simulations/simulationsRepository";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { CreateSimulationCase } from "../../../application/useCases/createSimulation/createSimulationCase";
import { GetSimulationsCase } from "../../../application/useCases/getSimulations/getSimulationsCase";
import { SimulationError } from "../../../domain/entities/Simulation/errors/simulation";

import { httpResponsePresenter } from "../../presenters/http/response/httpResponsePresenter";

export class SimulationsController {
	constructor(
		private logger: logger,
		private jwt: JWTTokens,
		private SimulationsRepository: SimulationsRepository,
	) {}

	async getSimulations(accessToken: string) {
		const getSimulationsCase = new GetSimulationsCase(
			this.jwt,
			this.SimulationsRepository,
		);
		const getSimulationsResult =
			await getSimulationsCase.getSimulations(accessToken);

		// if ("message" in getSimulationsResult) {
		//   return httpResponsePresenter.badRequest(getSimulationsResult);
		// }

		return httpResponsePresenter.ok(getSimulationsResult);
	}

	async createSimulation(
		accessToken: string,
		installmentsQuantity: number,
		interestPerMonth: number,
		totalValue: number,
	) {
		try {
			const createSimulationCase = new CreateSimulationCase(
				this.jwt,
				this.SimulationsRepository,
			);
			const getSimulationsResult = await createSimulationCase.createSimulation(
				accessToken,
				installmentsQuantity,
				interestPerMonth,
				totalValue,
			);

			// if ("message" in getSimulationsResult) {
			//   return httpResponsePresenter.badRequest(getSimulationsResult);
			// }

			return httpResponsePresenter.created(getSimulationsResult);
		} catch (error) {
			if (error instanceof SimulationError) {
				return httpResponsePresenter.badRequest({ message: error.message });
			}

			throw error;
		}
	}
}
