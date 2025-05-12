import type { logger } from "../../../application/logger/logger";
import type { SimulationsRepository } from "../../../application/repository/simulations/simulationsRepository";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { GetSimulationsCase } from "../../../application/useCases/getSimulations/getSimulationsCase";

import { httpResponsePresenter } from "../../presenters/http/response/httpResponsePresenter";

export class SimulationsController {
	constructor(
		private logger: logger,
		private jwt: JWTTokens,
		private SimulationsRepository: SimulationsRepository,
	) {}

	async getSimulations(accessToken: string) {
		const getSimulationsCase = new GetSimulationsCase(
			accessToken,
			this.jwt,
			this.SimulationsRepository,
		);
		const getSimulationsResult = await getSimulationsCase.getSimulations();

		// if ("message" in getSimulationsResult) {
		//   return httpResponsePresenter.badRequest(getSimulationsResult);
		// }

		return httpResponsePresenter.ok(getSimulationsResult);
	}
}
