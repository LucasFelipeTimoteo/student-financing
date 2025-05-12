import { SimulationError } from "../../errors/simulation";

export class SimulationId {
	constructor(public readonly value: string) {
		if (!value) {
			throw new SimulationError(`ID is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new SimulationError(
				`ID should be a string, but received: ${value}`,
			);
		}
	}
}
