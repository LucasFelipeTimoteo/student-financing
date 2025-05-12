import { SimulationError } from "../../errors/simulation";
import type { SimulationInstallmentsQuantity } from "../simulationInstallmentsQuantity/simulationInstallmentsQuantity";
import type { SimulationInterestPerMonth } from "../simulationInterestPerMonth/simulationInterestPerMonth";
import type { SimulationTotalValue } from "../simulationTotalValue/simulationTotalValue";

export class SimulationMonthlyInstallmentValue {
	public readonly value: number;

	constructor(
		private totalValue: SimulationTotalValue,
		private interestPerMonth: SimulationInterestPerMonth,
		private installmentsQuantity: SimulationInstallmentsQuantity,
	) {
		this.value = this.#calculateMonthlyInstallment();

		if (!this.value) {
			throw new SimulationError(
				`monthly installments is required, but received: ${this.value}`,
			);
		}

		if (typeof this.value !== "number") {
			throw new SimulationError(
				`monthly installments must be a number, but received: ${typeof this.value} of value ${this.value}`,
			);
		}

		if (this.value === 0) {
			throw new SimulationError(
				`monthly installments must be greater than 0, but received: ${this.value}`,
			);
		}
	}

	#calculateMonthlyInstallment(): number {
		const totalValue = this.totalValue.value;
		const interestPerMounth = this.interestPerMonth.value;
		const installmentsQuantity = this.installmentsQuantity.value;

		if (interestPerMounth > 0) {
			const numerator = totalValue * interestPerMounth;
			const denominator = 1 - (1 + interestPerMounth) ** -installmentsQuantity;
			const monthlyInstallment = numerator / denominator;
			return Math.round(monthlyInstallment * 100) / 100;
		}

		const monthlyInstallment = totalValue / installmentsQuantity;
		return Math.round(monthlyInstallment * 100) / 100;
	}
}
