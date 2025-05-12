import { SimulationError } from "../../../../errors/simulation";
import { SimulationTotalValue } from "../../simulationTotalValue";

describe("SimulationTotalValue", () => {
	it("should create a valid instance with an decimal value", () => {
		const expected = 100.45;
		const instance = new SimulationTotalValue(expected);
		expect(instance.value).toBe(expected);
	});

	it("should throw if value is 0", () => {
		const expected = 0;
		expect(() => new SimulationTotalValue(expected)).toThrow(SimulationError);
		expect(() => new SimulationTotalValue(expected)).toThrow(
			`total value is required, but received: ${expected}`,
		);
	});

	it("should throw if value is undefined", () => {
		expect(() => new SimulationTotalValue(undefined as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is null", () => {
		expect(() => new SimulationTotalValue(null as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is not a number", () => {
		const expected = "100" as any;
		expect(() => new SimulationTotalValue(expected)).toThrow(SimulationError);
		expect(() => new SimulationTotalValue(expected)).toThrow(
			`total value must be a number, but received: ${typeof expected} of value ${expected}`,
		);
	});
});
