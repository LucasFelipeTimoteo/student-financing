import { ServerError } from "../../application/errors/server/serverError";
import type { logger } from "../../application/logger/logger";
import type { StudentRepository } from "../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../application/responses/general/message/messageResponse";
import { StudentEntity } from "../../domain/entities/Student/studentEntity";
import type { StudentEmail } from "../../domain/value objects/student/studentEmail/studentEmail";
import type { StudentFirstName } from "../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentId } from "../../domain/value objects/student/studentId/studentId";
import type { StudentLastName } from "../../domain/value objects/student/studentLastName/studentLastName";
import type { StudentPassword } from "../../domain/value objects/student/studentPassword/studentPassword";
import type { EntrypointDatabaseClients } from "../http/express/types/entrypoint/entrypointTypes";
import { Student } from "./typeORM/entity/Student";

export class StudentRepositoryTypeORM implements StudentRepository {
	constructor(
		private logger: logger,
		private client: EntrypointDatabaseClients,
	) {}

	async login(email: StudentEmail) {
		try {
			const typeORMClient = await this.client;

			const student = await typeORMClient.manager.findOne(Student, {
				where: { email: email.value },
			});
			if (!student) {
				return { message: "Invalid credentials. Incorrect e-mail or password" };
			}

			return new StudentEntity(student);
		} catch (error) {
			throw new ServerError("Unknown Server Error");
		}
	}

	async register(
		firstName: StudentFirstName,
		lastName: StudentLastName,
		email: StudentEmail,
		hashedPassword: StudentPassword,
	): Promise<StudentId | MessageResponse> {
		const student = new Student();
		student.firstName = firstName.value;
		student.lastName = lastName.value;
		student.email = email.value;
		student.password = hashedPassword.value;

		try {
			const typeORMClient = await this.client;
			const newUser = await typeORMClient.manager.save(student);

			return new StudentId(newUser.id);
		} catch (error) {
			this.logger.debug(error);

			if (!(error instanceof Error)) {
				throw new ServerError("Unknown server error");
			}

			return { message: "Invalid credentials. Consider using another e-mail" };
		}
	}
}
