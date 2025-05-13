import { SimulationInstallmentsQuantity } from "../../../domain/entities/Simulation/value objects/simulationInstallmentsQuantity/simulationInstallmentsQuantity";
import { SimulationInterestPerMonth } from "../../../domain/entities/Simulation/value objects/simulationInterestPerMonth/simulationInterestPerMonth";
import { SimulationMonthlyInstallmentValue } from "../../../domain/entities/Simulation/value objects/simulationMonthlyInstallmentValue/simulationMonthlyInstallmentValue";
import { SimulationTotalValue } from "../../../domain/entities/Simulation/value objects/simulationTotalValue/simulationTotalValue";
import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { SimulationsRepository } from "../../repository/simulations/simulationsRepository";
import type { RawSimulation } from "../../simulations/simulation";
import type { JWTTokens, StudentToken } from "../../tokens/jwt/JWTTokens";
import { JWTTokensError } from "../../tokens/jwt/errors/JWTTokensError";

export class CreateSimulationCase {
	constructor(
		private jwtTokens: JWTTokens,
		private simulationsRepository: SimulationsRepository,
	) {}

	async createSimulation(
		accessToken: string,
		installmentsQuantity: number,
		interestPerMonth: number,
		totalValue: number,
	): Promise<
		| RawSimulation
		| {
				message: string;
		  }
	> {
		const tokenData = this.jwtTokens.verifyToken(
			accessToken,
			appEnv.accessTokenJwtSecret,
		);
		if (!this.#tokenPayloadTypeGuard(tokenData)) {
			return JWTTokensError.invalidTokenResponse;
		}

		const studentId = new StudentId(tokenData.userId);
		const monthlyInstallment = new SimulationMonthlyInstallmentValue(
			new SimulationTotalValue(totalValue),
			new SimulationInterestPerMonth(interestPerMonth),
			new SimulationInstallmentsQuantity(installmentsQuantity),
		);

		const simulation = await this.simulationsRepository.createSimulation({
			studentId: studentId.value,
			totalValue,
			installmentsQuantity,
			interestPerMonth,
			monthlyInstallmentValue: monthlyInstallment.value,
		});

		const parsedSimulation: RawSimulation = {
			studentId: simulation.studentId.value,
			id: simulation.id.value,
			totalValue: simulation.totalValue.value,
			installmentsQuantity: simulation.installmentsQuantity.value,
			interestPerMonth: simulation.interestPerMonth.value,
			monthlyInstallmentValue: simulation.monthlyInstallmentValue.value,
		};

		return parsedSimulation;
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
