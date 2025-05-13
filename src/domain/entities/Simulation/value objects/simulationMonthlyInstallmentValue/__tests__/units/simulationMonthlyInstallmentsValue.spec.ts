import { SimulationInstallmentsQuantity } from "../../../simulationInstallmentsQuantity/simulationInstallmentsQuantity";
import { SimulationInterestPerMonth } from "../../../simulationInterestPerMonth/simulationInterestPerMonth";
import { SimulationTotalValue } from "../../../simulationTotalValue/simulationTotalValue";
import { SimulationMonthlyInstallmentValue } from "../../simulationMonthlyInstallmentValue";

const totalValue = new SimulationTotalValue(50000.0);
const interestPerMonth = new SimulationInterestPerMonth(0.015);
const installmentsQuantity = new SimulationInstallmentsQuantity(24);
const expectedMonthlyStallments = 2496.21;

describe("SimulationMonthlyInstallmentValue", () => {
	it("should create a valid instance with an decimal value", () => {
		const instance = new SimulationMonthlyInstallmentValue(
			totalValue,
			interestPerMonth,
			installmentsQuantity,
		);
		expect(instance.value).toBe(expectedMonthlyStallments);
	});

	// TODO: Create unhappy path cases
});
