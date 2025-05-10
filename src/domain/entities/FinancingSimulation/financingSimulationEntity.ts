import { FinancingSimulationError } from "./errors/financingSimulation";

export class FinancingSimulationEntity {
	constructor(
		public id: string,
		public id_student: string,
		public total_value: number,
		public installments_amount: number,
		public monthly_interest: number,
		public monthly_installment_amount: number,
	) {
		this.#validateId();
		this.#validateIdStudent();
		this.#validateTotalValue();
		this.#validateInstallmentsAmount();
		this.#validateMonthlyInterest();
		this.#validateMonthlyInstallmentAmount();
	}

	#validateId() {
		if (!this.id) {
			throw new FinancingSimulationError(
				`ID is required, but received: ${this.id}`,
			);
		}

		if (typeof this.id !== "string") {
			throw new FinancingSimulationError(
				`ID should be a string, but received: ${this.id}`,
			);
		}

		if (this.id.length < 1) {
			throw new FinancingSimulationError(
				`ID should have a length greater than 0, but received ${this.id.length}`,
			);
		}
	}

	#validateIdStudent() {
		if (!this.id_student) {
			throw new FinancingSimulationError(
				`Student ID is required, but received: ${this.id_student}`,
			);
		}

		if (typeof this.id_student !== "string") {
			throw new FinancingSimulationError(
				`Student ID should be a string, but received: ${this.id_student}`,
			);
		}

		if (this.id_student.length < 1) {
			throw new FinancingSimulationError(
				`Student ID should have a length greater than 0, but received ${this.id_student.length}`,
			);
		}
	}

	#validateTotalValue() {
		if (this.total_value === undefined || this.total_value === null) {
			throw new FinancingSimulationError(
				`Total value is required, but received: ${this.total_value}`,
			);
		}

		if (typeof this.total_value !== "number") {
			throw new FinancingSimulationError(
				`Total value should be a number, but received: ${this.total_value}`,
			);
		}

		if (this.total_value <= 0) {
			throw new FinancingSimulationError(
				`Total value should be greater than 0, but received: ${this.total_value}`,
			);
		}
	}

	#validateInstallmentsAmount() {
		if (
			this.installments_amount === undefined ||
			this.installments_amount === null
		) {
			throw new FinancingSimulationError(
				`Installments amount is required, but received: ${this.installments_amount}`,
			);
		}

		if (typeof this.installments_amount !== "number") {
			throw new FinancingSimulationError(
				`Installments amount should be a number, but received: ${this.installments_amount}`,
			);
		}

		if (this.installments_amount <= 0) {
			throw new FinancingSimulationError(
				`Installments amount should be greater than 0, but received: ${this.installments_amount}`,
			);
		}

		if (!Number.isInteger(this.installments_amount)) {
			throw new FinancingSimulationError(
				`Installments amount should be an integer, but received: ${this.installments_amount}`,
			);
		}
	}

	#validateMonthlyInterest() {
		if (this.monthly_interest === undefined || this.monthly_interest === null) {
			throw new FinancingSimulationError(
				`Monthly interest is required, but received: ${this.monthly_interest}`,
			);
		}

		if (typeof this.monthly_interest !== "number") {
			throw new FinancingSimulationError(
				`Monthly interest should be a number, but received: ${this.monthly_interest}`,
			);
		}

		if (this.monthly_interest < 0) {
			throw new FinancingSimulationError(
				`Monthly interest should be a positive number, but received: ${this.monthly_interest}`,
			);
		}
	}

	#validateMonthlyInstallmentAmount() {
		if (
			this.monthly_installment_amount === undefined ||
			this.monthly_installment_amount === null
		) {
			throw new FinancingSimulationError(
				`Monthly installment amount is required, but received: ${this.monthly_installment_amount}`,
			);
		}

		if (typeof this.monthly_installment_amount !== "number") {
			throw new FinancingSimulationError(
				`Monthly installment amount should be a number, but received: ${this.monthly_installment_amount}`,
			);
		}

		if (this.monthly_installment_amount <= 0) {
			throw new FinancingSimulationError(
				`Monthly installment amount should be greater than 0, but received: ${this.monthly_installment_amount}`,
			);
		}
	}
}
