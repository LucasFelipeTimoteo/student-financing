import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import type { SimulationsRepository } from "../../repository/simulations/simulationsRepository";
import type { JWTTokens } from "../../tokens/jwt/JWTTokens";

export class GetSimulationsCase {
	constructor(
		private accessToken: string,
		private jwtTokens: JWTTokens,
		private simulationsRepository: SimulationsRepository,
	) {}

	async getSimulations() {
		const studantId = new StudentId("id-student-example");
		const simulations =
			await this.simulationsRepository.getSimulations(studantId);
		return simulations;
	}
}
