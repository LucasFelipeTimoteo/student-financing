import { SimulationError } from "../../errors/simulation";

export class SimulationInterestPerMonth {
	constructor(public readonly value: number) {
		if (!value) {
			throw new SimulationError(
				`interest per month is required, but received: ${value}`,
			);
		}

		if (typeof value !== "number") {
			throw new SimulationError(
				`interest per month must be a number, but received: ${typeof value} of value ${value}`,
			);
		}
	}
}
