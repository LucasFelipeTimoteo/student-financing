import type { StudentEmail } from "../../value objects/student/studentEmail/studentEmail";
import type { StudentFirstName } from "../../value objects/student/studentFirstName/studentFirstName";
import type { StudentId } from "../../value objects/student/studentId/studentId";
import type { StudentLastName } from "../../value objects/student/studentLastName/studentLastName";
import type { StudentPassword } from "../../value objects/student/studentPassword/studentPassword";

export class StudentEntity {
	constructor(
		public readonly id: StudentId,
		public readonly name: StudentFirstName,
		public readonly lastName: StudentLastName,
		public readonly email: StudentEmail,
		public readonly password: StudentPassword,
	) {}
}
