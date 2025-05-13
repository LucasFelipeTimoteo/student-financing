import { SimulationError } from "../../errors/simulation";

export class SimulationTotalValue {
	constructor(public readonly value: number) {
		if (!value) {
			throw new SimulationError(
				`total value is required, but received: ${value}`,
			);
		}

		if (typeof value !== "number") {
			throw new SimulationError(
				`total value must be a number, but received: ${typeof value} of value ${value}`,
			);
		}

		if (value === 0) {
			throw new SimulationError(
				`total value must be a decimal greater than 0, but received: ${value}`,
			);
		}
	}
}
