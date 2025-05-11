import { StudentError } from "../../../../../entities/Student/errors/studentError";
import { StudentEmail } from "../../studentEmail";

describe("StudentEmail", () => {
	it("should create a valid email", () => {
		const email = new StudentEmail("lucas@example.com");
		expect(email.value).toBe("lucas@example.com");
	});

	it("should throw error for empty email", () => {
		expect(() => new StudentEmail("")).toThrow(StudentError);
	});

	it("should throw error for invalid format", () => {
		expect(() => new StudentEmail("invalid-email")).toThrow(StudentError);
	});

	it("should throw error for non-string", () => {
		expect(() => new StudentEmail(42 as any)).toThrow(StudentError);
	});
});
