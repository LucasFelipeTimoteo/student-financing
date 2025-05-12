import type { SimulationEntity } from "../../../domain/entities/Simulation/SimulationEntity";
import type { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import type { RawSimulation } from "../../simulations/simulation";

export interface SimulationsRepository {
	getSimulations(studentId: StudentId): Promise<SimulationEntity>;
	createSimulation(
		simulationValues: Omit<RawSimulation, "id">,
	): Promise<SimulationEntity>;
}
