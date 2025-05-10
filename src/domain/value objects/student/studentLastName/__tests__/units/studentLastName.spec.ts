import { StudentError } from "../../../../../entities/Student/errors/student";
import { StudentLastName } from "../../studentLastName";

describe("StudentLastName", () => {
	it("should create a valid StudentLastName", () => {
		const lastName = new StudentLastName("Timóteo");
		expect(lastName.value).toBe("Timóteo");
	});

	it("should throw error for empty last name", () => {
		expect(() => new StudentLastName("")).toThrow(StudentError);
	});

	it("should throw error for short last name", () => {
		expect(() => new StudentLastName("T")).toThrow(StudentError);
	});

	it("should throw error for non-string", () => {
		expect(() => new StudentLastName(123 as any)).toThrow(StudentError);
	});
});
