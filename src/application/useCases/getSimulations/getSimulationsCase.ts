import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { SimulationsRepository } from "../../repository/simulations/simulationsRepository";
import type { MessageResponse } from "../../responses/general/message/messageResponse";
import type { RawSimulation } from "../../simulations/simulation";
import type { JWTTokens, StudentToken } from "../../tokens/jwt/JWTTokens";
import { JWTTokensError } from "../../tokens/jwt/errors/JWTTokensError";

export class GetSimulationsCase {
	constructor(
		private jwtTokens: JWTTokens,
		private simulationsRepository: SimulationsRepository,
	) {}

	async getSimulations(
		accessToken: string,
	): Promise<RawSimulation[] | MessageResponse> {
		const tokenData = this.jwtTokens.verifyToken(
			accessToken,
			appEnv.accessTokenJwtSecret,
		);
		if (!this.#tokenPayloadTypeGuard(tokenData)) {
			return JWTTokensError.invalidTokenResponse;
		}

		const studentId = new StudentId(tokenData.userId);
		const simulations =
			await this.simulationsRepository.getSimulations(studentId);

		if (!simulations) {
			return {
				message: `Cannot find simulations for student ${studentId.value}`,
			};
		}

		const parsedSimulations: RawSimulation[] = simulations.map(
			(simulation) => ({
				id: simulation.id.value,
				studentId: simulation.studentId.value,
				totalValue: simulation.totalValue.value,
				installmentsQuantity: simulation.installmentsQuantity.value,
				interestPerMonth: simulation.interestPerMonth.value,
				monthlyInstallmentValue: simulation.monthlyInstallmentValue.value,
			}),
		);

		return parsedSimulations;
	}

	#tokenPayloadTypeGuard(payload: unknown): payload is StudentToken {
		return (
			typeof payload === "object" &&
			payload !== null &&
			"userId" in payload &&
			// biome-ignore lint/suspicious/noExplicitAny: <it is ok to use any in a typeguard to verity typeof>
			typeof (payload as any).userId === "string"
		);
	}
}
