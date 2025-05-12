import { ServerError } from "../../application/errors/server/serverError";
import type { logger } from "../../application/logger/logger";
import type { StudentRepository } from "../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../application/responses/general/message/messageResponse";
import type {
	RawStudent,
	partialStudent,
} from "../../application/students/students";
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

	async getStudent(studentId: StudentId): Promise<StudentEntity | null> {
		const typeORMClient = await this.client;
		const student = await typeORMClient.manager.findOne(Student, {
			where: { id: studentId.value },
		});

		if (!student) {
			this.logger.debug(`Student with id ${studentId} not found`);
			return null;
		}

		return new StudentEntity({
			id: student.id,
			firstName: student.firstName,
			lastName: student.lastName,
			email: student.email,
			password: student.password,
		});
	}

	async editStudent(
		partialStudent: partialStudent,
		studentId: StudentId,
	): Promise<StudentId | null> {
		const updateData: Partial<Omit<RawStudent, "id">> = {};

		if (partialStudent.firstName !== undefined)
			updateData.firstName = partialStudent.firstName.value;
		if (partialStudent.lastName !== undefined)
			updateData.lastName = partialStudent.lastName.value;
		if (partialStudent.email !== undefined)
			updateData.email = partialStudent.email.value;
		if (partialStudent.password !== undefined)
			updateData.password = partialStudent.password.value;

		if (Object.keys(updateData).length === 0) {
			this.logger.debug(
				"'updateData' has no properties, so editStudents will not execte any query",
			);
			return null;
		}

		const typeORMClient = await this.client;

		const student = await typeORMClient.manager.update(
			Student,
			{ id: studentId.value },
			updateData,
		);

		if (student.affected === 0) {
			this.logger.debug("'updateData' query cannot update any field");
			return null;
		}

		this.logger.debug("successfuly updated user");

		return studentId;
	}
}
