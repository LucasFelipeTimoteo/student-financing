import type { logger } from "../../../application/logger/logger";
import type { StudentRepository } from "../../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../../application/responses/general/message/messageResponse";
import type {
	RawStudent,
	partialStudent,
} from "../../../application/students/students";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { EditStudentCase } from "../../../application/useCases/editStudent/editStudentCase";
import { GetStudentCase } from "../../../application/useCases/getStudent/getStudentCase";
import type { StudentId } from "../../../domain/value objects/student/studentId/studentId";

import {
	type HttpResponse,
	httpResponsePresenter,
} from "../../presenters/http/response/httpResponsePresenter";

export class StudentController {
	constructor(
		private logger: logger,
		private jwt: JWTTokens,
		private studentRepository: StudentRepository,
	) {}

	async getStudent(
		accessToken: string,
	): Promise<HttpResponse<Omit<RawStudent, "password">>> {
		const getStudentCase = new GetStudentCase(
			accessToken,
			this.jwt,
			this.studentRepository,
		);
		const getStudentResult = await getStudentCase.get();
		const studentResponse: Omit<RawStudent, "password"> = {
			id: getStudentResult.id.value,
			firstName: getStudentResult.firstName.value,
			lastName: getStudentResult.lastName.value,
			email: getStudentResult.email.value,
		};

		return httpResponsePresenter.ok(studentResponse);
	}

	async editStudent(
		partialStudent: partialStudent,
	): Promise<HttpResponse<StudentId | MessageResponse>> {
		const registerCase = new EditStudentCase(
			partialStudent,
			this.logger,
			this.studentRepository,
		);
		const registerResult = await registerCase.edit();

		return httpResponsePresenter.ok(registerResult);
	}
}
