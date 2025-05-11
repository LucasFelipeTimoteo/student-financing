import { StudentError } from "../../../../../entities/Student/errors/studentError";
import { StudentPassword } from "../../studentPassword";

describe("StudentPassword", () => {
	it("should create a valid password", () => {
		const password = new StudentPassword("12345678");
		expect(password.value).toBe("12345678");
	});

	it("should throw error for empty password", () => {
		expect(() => new StudentPassword("")).toThrow(StudentError);
	});

	it("should throw error for short password", () => {
		expect(() => new StudentPassword("123")).toThrow(StudentError);
	});

	it("should throw error for non-string", () => {
		expect(() => new StudentPassword({} as any)).toThrow(StudentError);
	});
});
