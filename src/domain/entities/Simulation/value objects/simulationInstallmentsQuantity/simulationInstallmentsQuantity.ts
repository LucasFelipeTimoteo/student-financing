import { SimulationError } from "../../errors/simulation";

export class SimulationInstallmentsQuantity {
	constructor(public readonly value: number) {
		if (!value) {
			throw new SimulationError(
				`installments quantity is required, but received: ${value}`,
			);
		}

		if (typeof value !== "number") {
			throw new SimulationError(
				`installments quantity must be a number, but received: ${typeof value} of value ${value}`,
			);
		}

		if (!Number.isInteger(value)) {
			throw new SimulationError(
				`installments quantity must be an integer number, but received: ${value}`,
			);
		}

		if (value === 0) {
			throw new SimulationError(
				`installments quantity must be an integer greater than 0, but received: ${value}`,
			);
		}
	}
}
