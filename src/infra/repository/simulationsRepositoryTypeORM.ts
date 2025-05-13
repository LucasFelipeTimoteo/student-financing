import type { logger } from "../../application/logger/logger";
import type { SimulationsRepository } from "../../application/repository/simulations/simulationsRepository";
import type { RawSimulation } from "../../application/simulations/simulation";
import { SimulationEntity } from "../../domain/entities/Simulation/SimulationEntity";
import type { StudentId } from "../../domain/value objects/student/studentId/studentId";
import type { EntrypointDatabaseClients } from "../http/express/types/entrypoint/entrypointTypes";
import { Simulation } from "./typeORM/entity/Simulation";

export class SimulationsRepositoryTypeORM implements SimulationsRepository {
	constructor(
		private logger: logger,
		private client: EntrypointDatabaseClients,
	) {}

	async getSimulations(
		studentId: StudentId,
	): Promise<SimulationEntity[] | null> {
		const typeORMCLient = await this.client;

		const studentSimulations = await typeORMCLient.manager.find(Simulation, {
			where: { studentId: studentId.value },
		});

		if (studentSimulations.length === 0) {
			return null;
		}

		const parsedSimulations = studentSimulations.map(
			(simulation) =>
				new SimulationEntity({
					id: simulation.id,
					studentId: simulation.studentId,
					totalValue: Number(simulation.totalValue),
					installmentsQuantity: simulation.installmentsQuantity,
					interestPerMonth: Number(simulation.interestPerMonth),
					monthlyInstallmentValue: Number(simulation.monthlyInstallmentValue),
				}),
		);

		return parsedSimulations;
	}

	async createSimulation({
		studentId,
		totalValue,
		installmentsQuantity,
		interestPerMonth,
		monthlyInstallmentValue,
	}: Omit<RawSimulation, "id">): Promise<SimulationEntity> {
		const simulation = new Simulation();
		simulation.studentId = studentId;
		simulation.totalValue = totalValue;
		simulation.installmentsQuantity = installmentsQuantity;
		simulation.interestPerMonth = interestPerMonth;
		simulation.monthlyInstallmentValue = monthlyInstallmentValue;

		const typeORMCLient = await this.client;
		const createdSimulation = await typeORMCLient.manager.save(simulation);

		this.logger.debug(createdSimulation);

		const validatedCreatedSimulation = new SimulationEntity({
			id: createdSimulation.id,
			studentId: createdSimulation.studentId,
			totalValue: createdSimulation.totalValue,
			installmentsQuantity: createdSimulation.installmentsQuantity,
			interestPerMonth: createdSimulation.interestPerMonth,
			monthlyInstallmentValue: createdSimulation.monthlyInstallmentValue,
		});

		this.logger.debug(
			`Successfully create simulation ${createdSimulation.id} for user ${createdSimulation.studentId}`,
		);

		return validatedCreatedSimulation;
	}
}
