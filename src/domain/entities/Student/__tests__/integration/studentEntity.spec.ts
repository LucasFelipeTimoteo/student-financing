import { StudentEmail } from "../../../../value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../../../value objects/student/studentFirstName/studentFirstName";
import { StudentId } from "../../../../value objects/student/studentId/studentId";
import { StudentLastName } from "../../../../value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../../value objects/student/studentPassword/studentPassword";
import { StudentError } from "../../errors/student";
import { StudentEntity } from "../../studentEntity";

describe("StudentEntity", () => {
	const valid = {
		id: new StudentId("abc123"),
		name: new StudentFirstName("Lucas"),
		lastName: new StudentLastName("Timóteo"),
		email: new StudentEmail("lucas@example.com"),
		password: new StudentPassword("12345678"),
	};

	// HAPPY PATH
	it("should create a valid StudentEntity", () => {
		const student = new StudentEntity(
			valid.id,
			valid.name,
			valid.lastName,
			valid.email,
			valid.password,
		);

		expect(student.id.value).toBe("abc123");
		expect(student.name.value).toBe("Lucas");
		expect(student.lastName.value).toBe("Timóteo");
		expect(student.email.value).toBe("lucas@example.com");
		expect(student.password.value).toBe("12345678");
	});

	// UNHAPPY PATH
	it("should throw if id is invalid", () => {
		expect(() => {
			new StudentEntity(
				new StudentId(""),
				valid.name,
				valid.lastName,
				valid.email,
				valid.password,
			);
		}).toThrow(StudentError);
	});

	it("should throw if name is invalid", () => {
		expect(() => {
			new StudentEntity(
				valid.id,
				new StudentFirstName("L"),
				valid.lastName,
				valid.email,
				valid.password,
			);
		}).toThrow(StudentError);
	});

	it("should throw if last name is invalid", () => {
		expect(() => {
			new StudentEntity(
				valid.id,
				valid.name,
				new StudentLastName("T"),
				valid.email,
				valid.password,
			);
		}).toThrow(StudentError);
	});

	it("should throw if email is invalid", () => {
		expect(() => {
			new StudentEntity(
				valid.id,
				valid.name,
				valid.lastName,
				new StudentEmail("not-an-email"),
				valid.password,
			);
		}).toThrow(StudentError);
	});

	it("should throw if password is invalid", () => {
		expect(() => {
			new StudentEntity(
				valid.id,
				valid.name,
				valid.lastName,
				valid.email,
				new StudentPassword("123"),
			);
		}).toThrow(StudentError);
	});
});
