import type { StudentEntity } from "../../../domain/entities/Student/studentEntity";
import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import type { logger } from "../../logger/logger";
import type { StudentRepository } from "../../repository/student/studentRepository";

export class EditStudentCase {
	constructor(
		private partialStudent: Partial<Omit<StudentEntity, "id">>,
		private logger: logger,
		private studentRepository: StudentRepository,
	) {}

	async edit() {
		return new StudentId("csdi");
	}
}
