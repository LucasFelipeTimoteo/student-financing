import { StudentError } from "../../../../../entities/Student/errors/studentError";
import { StudentFirstName } from "../../studentFirstName";

describe("StudentFirstName", () => {
	it("should create a valid StudentFirstName", () => {
		const name = new StudentFirstName("Lucas");
		expect(name.value).toBe("Lucas");
	});

	it("should throw error for short StudentFirstName", () => {
		expect(() => new StudentFirstName("L")).toThrow(StudentError);
	});

	it("should throw error for empty StudentFirstName", () => {
		expect(() => new StudentFirstName("")).toThrow(StudentError);
	});

	it("should throw error for non string StudentFirstName", () => {
		expect(() => new StudentFirstName(123 as any as string)).toThrow(
			StudentError,
		);
	});
});
