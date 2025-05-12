export class SimulationEntity {
	constructor(
		public readonly id: string,
		public readonly studentId: string,
		public readonly totalValue: number,
		public readonly installmentsQuantity: number,
		public readonly interestPerMonth: number,
		public readonly monthlyInstallmentValue?: number,
	) {}
}
