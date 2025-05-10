import { StudentError } from "../../../../../entities/Student/errors/student";
import { StudentId } from "../../studentId";

describe("StudentId", () => {
	it("should create a valid StudentId", () => {
		const id = new StudentId("abc123");
		expect(id.value).toBe("abc123");
	});

	it("should throw error for empty ID", () => {
		expect(() => new StudentId("")).toThrow(StudentError);
	});

	it("should throw error for non-string ID", () => {
		expect(() => new StudentId(123 as any)).toThrow(StudentError);
	});
});
