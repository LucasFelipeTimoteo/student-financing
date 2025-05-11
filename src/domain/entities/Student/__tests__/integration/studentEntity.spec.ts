import { StudentError } from "../../errors/student";
import { StudentEntity } from "../../studentEntity";

describe("StudentEntity", () => {
	const valid = {
		id: "abc123",
		firstName: "Lucas",
		lastName: "Timóteo",
		email: "lucas@example.com",
		password: "12345678",
	};

	// HAPPY PATH
	it("should create a valid StudentEntity", () => {
		const student = new StudentEntity(valid);

		expect(student.id.value).toBe("abc123");
		expect(student.firstName.value).toBe("Lucas");
		expect(student.lastName.value).toBe("Timóteo");
		expect(student.email.value).toBe("lucas@example.com");
		expect(student.password.value).toBe("12345678");
	});

	// UNHAPPY PATH
	it("should throw if id is invalid", () => {
		expect(() => {
			new StudentEntity({
				...valid,
				id: "",
			});
		}).toThrow(StudentError);
	});

	it("should throw if firstName is invalid", () => {
		expect(() => {
			new StudentEntity({
				...valid,
				firstName: "L",
			});
		}).toThrow(StudentError);
	});

	it("should throw if lastName is invalid", () => {
		expect(() => {
			new StudentEntity({
				...valid,
				lastName: "T",
			});
		}).toThrow(StudentError);
	});

	it("should throw if email is invalid", () => {
		expect(() => {
			new StudentEntity({
				...valid,
				email: "not-an-email",
			});
		}).toThrow(StudentError);
	});

	it("should throw if password is invalid", () => {
		expect(() => {
			new StudentEntity({
				...valid,
				password: "123",
			});
		}).toThrow(StudentError);
	});
});
