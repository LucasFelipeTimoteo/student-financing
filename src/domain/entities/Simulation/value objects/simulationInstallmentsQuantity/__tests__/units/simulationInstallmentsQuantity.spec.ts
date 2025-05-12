import { SimulationError } from "../../../../errors/simulation";
import { SimulationInstallmentsQuantity } from "../../simulationInstallmentsQuantity";

describe("SimulationTotalValue", () => {
	it("should create a valid instance with an integer value", () => {
		const instance = new SimulationInstallmentsQuantity(100);
		expect(instance.value).toBe(100);
	});

	it("should throw if value is 0", () => {
		expect(() => new SimulationInstallmentsQuantity(0)).toThrow(
			SimulationError,
		);
		expect(() => new SimulationInstallmentsQuantity(0)).toThrow(
			"installments quantity is required, but received: 0",
		);
	});

	it("should throw if value is undefined", () => {
		expect(() => new SimulationInstallmentsQuantity(undefined as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is null", () => {
		expect(() => new SimulationInstallmentsQuantity(null as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is not a number", () => {
		expect(() => new SimulationInstallmentsQuantity("100" as any)).toThrow(
			SimulationError,
		);
		expect(() => new SimulationInstallmentsQuantity("100" as any)).toThrow(
			/installments quantity must be a number/,
		);
	});

	it("should throw if value is not an integer", () => {
		expect(() => new SimulationInstallmentsQuantity(10.5)).toThrow(
			SimulationError,
		);
		expect(() => new SimulationInstallmentsQuantity(10.5)).toThrow(
			"installments quantity must be an integer number, but received: 10.5",
		);
	});
});
