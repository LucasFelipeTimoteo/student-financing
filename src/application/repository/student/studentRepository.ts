import type { StudentEntity } from "../../../domain/entities/Student/studentEntity";
import type { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import type { StudentFirstName } from "../../../domain/value objects/student/studentFirstName/studentFirstName";
import type { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import type { StudentLastName } from "../../../domain/value objects/student/studentLastName/studentLastName";
import type { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";
import type { MessageResponse } from "../../responses/general/message/messageResponse";
import type { partialStudent } from "../../students/students";

export interface StudentRepository {
	login(email: StudentEmail): Promise<StudentEntity | MessageResponse>;
	register(
		firstName: StudentFirstName,
		lastName: StudentLastName,
		email: StudentEmail,
		password: StudentPassword,
	): Promise<StudentId | MessageResponse>;
	getStudent(studentId: StudentId): Promise<StudentEntity | null>;
	editStudent(
		partialStudent: partialStudent,
		studentId: StudentId,
	): Promise<StudentId | null>;
}
