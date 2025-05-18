import type { logger } from "../../../application/logger/logger";
import type { PasswordHasher } from "../../../application/parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../../application/responses/general/message/messageResponse";
import type {
	RawStudent,
	partialStudent,
} from "../../../application/students/students";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { EditStudentCase } from "../../../application/useCases/editStudent/editStudentCase";
import { GetStudentCase } from "../../../application/useCases/getStudent/getStudentCase";
import { StudentError } from "../../../domain/entities/Student/errors/studentError";
import { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentLastName } from "../../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";

import {
	type HttpResponse,
	httpResponsePresenter,
} from "../../presenters/http/response/httpResponsePresenter";

export class StudentController {
	constructor(
		private logger: logger,
		private jwt: JWTTokens,
		private studentRepository: StudentRepository,
		private passwordHasher: PasswordHasher,
	) {}

	async getStudent(
		accessToken: string,
	): Promise<HttpResponse<Omit<RawStudent, "password"> | MessageResponse>> {
		const getStudentCase = new GetStudentCase(
			accessToken,
			this.jwt,
			this.studentRepository,
		);
		const getStudentResult = await getStudentCase.get();

		if ("message" in getStudentResult) {
			return httpResponsePresenter.badRequest(getStudentResult);
		}

		const studentResponse: Omit<RawStudent, "password"> = {
			id: getStudentResult.id.value,
			firstName: getStudentResult.firstName.value,
			lastName: getStudentResult.lastName.value,
			email: getStudentResult.email.value,
		};

		return httpResponsePresenter.ok(studentResponse);
	}

	async editStudent(
		partialStudent: Omit<RawStudent, "id">,
		accessToken: string,
	): Promise<HttpResponse<MessageResponse>> {
		try {
			const validatedPartialStudent: partialStudent = {
				...(typeof partialStudent.firstName === "string" && {
					firstName: new StudentFirstName(partialStudent.firstName),
				}),

				...(typeof partialStudent.lastName === "string" && {
					lastName: new StudentLastName(partialStudent.lastName),
				}),

				...(typeof partialStudent.email === "string" && {
					email: new StudentEmail(partialStudent.email),
				}),

				...(typeof partialStudent.password === "string" && {
					password: new StudentPassword(partialStudent.password),
				}),
			};

			const editUserCase = new EditStudentCase(
				validatedPartialStudent,
				accessToken,
				this.logger,
				this.studentRepository,
				this.jwt,
				this.passwordHasher,
			);
			const editUserResult = await editUserCase.edit();

			if (editUserResult !== null && "message" in editUserResult) {
				return httpResponsePresenter.badRequest(editUserResult);
			}

			if (editUserResult === null) {
				return httpResponsePresenter.ok({ message: "Nothing to change." });
			}

			return httpResponsePresenter.ok({
				message: `successfully update student ${editUserResult.value}`,
			});
		} catch (error) {
			if (error instanceof StudentError) {
				return httpResponsePresenter.badRequest({ message: error.message });
			}

			throw error;
		}
	}
}
