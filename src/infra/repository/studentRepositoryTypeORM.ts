import type { StudentRepository } from "../../application/repository/student/studentRepository";
import { StudentEntity } from "../../domain/entities/Student/studentEntity";
import { StudentEmail } from "../../domain/value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentId } from "../../domain/value objects/student/studentId/studentId";
import { StudentLastName } from "../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../domain/value objects/student/studentPassword/studentPassword";

export class StudentRepositoryTypeORM implements StudentRepository {
	async login(
		username: string,
		hashedPassword: string,
	): Promise<StudentEntity | null> {
		return new StudentEntity(
			new StudentId("sas"),
			new StudentFirstName("lucas"),
			new StudentLastName("timoteo"),
			new StudentEmail("email@email.com"),
			new StudentPassword("12345"),
		);
	}

	async register(
		username: string,
		hashedPassword: string,
	): Promise<StudentEntity | null> {
		return new StudentEntity(
			new StudentId("sas"),
			new StudentFirstName("lucas"),
			new StudentLastName("timoteo"),
			new StudentEmail("email@email.com"),
			new StudentPassword("12345"),
		);
	}
}
