import { SimulationError } from "../../../../errors/simulation";
import { SimulationId } from "../../simulationId";

describe("SimulationId", () => {
	it("should create a valid SimulationId", () => {
		const id = new SimulationId("abc123");
		expect(id.value).toBe("abc123");
	});

	it("should throw error for empty ID", () => {
		expect(() => new SimulationId("")).toThrow(SimulationError);
	});

	it("should throw error for non-string ID", () => {
		expect(() => new SimulationId(123 as any)).toThrow(SimulationError);
	});
});
