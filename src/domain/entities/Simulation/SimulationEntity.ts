import { StudentId } from "../../value objects/student/studentId/studentId";
import { SimulationId } from "./value objects/simulationId/simulationId";
import { SimulationInstallmentsQuantity } from "./value objects/simulationInstallmentsQuantity/simulationInstallmentsQuantity";
import { SimulationInterestPerMonth } from "./value objects/simulationInterestPerMonth/simulationInterestPerMonth";
import { SimulationMonthlyInstallmentValue } from "./value objects/simulationMonthlyInstallmentValue/simulationMonthlyInstallmentValue";
import { SimulationTotalValue } from "./value objects/simulationTotalValue/simulationTotalValue";

export class SimulationEntity {
	public readonly id: SimulationId;
	public readonly studentId: StudentId;
	public readonly totalValue: SimulationTotalValue;
	public readonly installmentsQuantity: SimulationInstallmentsQuantity;
	public readonly interestPerMonth: SimulationInterestPerMonth;
	public readonly monthlyInstallmentValue?: SimulationMonthlyInstallmentValue;

	constructor(simulation: {
		id: string;
		studentId: string;
		totalValue: number;
		installmentsQuantity: number;
		interestPerMonth: number;
		monthlyInstallmentValue?: number;
	}) {
		this.id = new SimulationId(simulation.id);
		this.studentId = new StudentId(simulation.studentId);
		this.totalValue = new SimulationTotalValue(simulation.totalValue);
		this.installmentsQuantity = new SimulationInstallmentsQuantity(
			simulation.installmentsQuantity,
		);
		this.interestPerMonth = new SimulationInterestPerMonth(
			simulation.interestPerMonth,
		);
		if (simulation.monthlyInstallmentValue) {
			this.monthlyInstallmentValue = new SimulationMonthlyInstallmentValue(
				simulation.monthlyInstallmentValue,
			);
		}
	}
}
