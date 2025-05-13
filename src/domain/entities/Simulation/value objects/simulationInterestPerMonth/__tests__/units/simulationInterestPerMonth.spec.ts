import { SimulationError } from "../../../../errors/simulation";
import { SimulationInterestPerMonth } from "../../simulationInterestPerMonth";

describe("SimulationInterestPerMonth", () => {
	it("should create a valid instance with an decimal value", () => {
		const expected = 100.45;
		const instance = new SimulationInterestPerMonth(expected);
		expect(instance.value).toBe(expected);
	});

	it("should throw if value is 0", () => {
		const expected = 0;
		expect(() => new SimulationInterestPerMonth(expected)).toThrow(
			SimulationError,
		);
		expect(() => new SimulationInterestPerMonth(expected)).toThrow(
			`interest per month is required, but received: ${expected}`,
		);
	});

	it("should throw if value is undefined", () => {
		expect(() => new SimulationInterestPerMonth(undefined as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is null", () => {
		expect(() => new SimulationInterestPerMonth(null as any)).toThrow(
			SimulationError,
		);
	});

	it("should throw if value is not a number", () => {
		const expected = "100" as any;
		expect(() => new SimulationInterestPerMonth(expected)).toThrow(
			SimulationError,
		);
		expect(() => new SimulationInterestPerMonth(expected)).toThrow(
			`interest per month must be a number, but received: ${typeof expected} of value ${expected}`,
		);
	});
});
