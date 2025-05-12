import type { logger } from "../../application/logger/logger";
import type { SimulationsRepository } from "../../application/repository/simulations/simulationsRepository";
import type { RawSimulation } from "../../application/simulations/simulation";
import { SimulationEntity } from "../../domain/entities/Simulation/SimulationEntity";
import type { StudentId } from "../../domain/value objects/student/studentId/studentId";
import type { EntrypointDatabaseClients } from "../http/express/types/entrypoint/entrypointTypes";

export class SimulationsRepositoryTypeORM implements SimulationsRepository {
	constructor(
		private logger: logger,
		private client: EntrypointDatabaseClients,
	) {}

	async getSimulations(studentId: StudentId): Promise<SimulationEntity> {
		return new SimulationEntity({
			id: "example-id",
			studentId: studentId.value,
			totalValue: 100000,
			installmentsQuantity: 10,
			interestPerMonth: 2,
			monthlyInstallmentValue: 2000,
		});
	}

	async createSimulation(
		simulationValues: RawSimulation,
	): Promise<SimulationEntity> {
		return new SimulationEntity(simulationValues);
	}
}
