import type { logger } from "../../application/logger/logger";
import type { SimulationsRepository } from "../../application/repository/simulations/simulationsRepository";
import { SimulationEntity } from "../../domain/entities/Simulation/SimulationEntity";
import type { StudentId } from "../../domain/value objects/student/studentId/studentId";
import type { EntrypointDatabaseClients } from "../http/express/types/entrypoint/entrypointTypes";

export class SimulationsRepositoryTypeORM implements SimulationsRepository {
	constructor(
		private logger: logger,
		private client: EntrypointDatabaseClients,
	) {}

	async getSimulations(studentId: StudentId): Promise<SimulationEntity> {
		return new SimulationEntity(
			"example-id",
			studentId.value,
			100000,
			10,
			2,
			2000,
		);
	}
}
