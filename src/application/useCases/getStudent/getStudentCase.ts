import type { StudentEntity } from "../../../domain/entities/Student/studentEntity";
import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import { ApiValidationError } from "../../errors/apiValidation/apiValidationError";
import type { StudentRepository } from "../../repository/student/studentRepository";
import type { JWTTokens, StudentToken } from "../../tokens/jwt/JWTTokens";

export class GetStudentCase {
	constructor(
		private accessToken: string,
		private jwtTokens: JWTTokens,
		private studentRepository: StudentRepository,
	) {}

	async get(): Promise<Omit<StudentEntity, "password">> {
		const tokenData = this.jwtTokens.verifyToken(
			this.accessToken,
			appEnv.accessTokenJwtSecret,
		);
		if (!this.#tokenPayloadTypeGuard(tokenData)) {
			throw new ApiValidationError("Invalid token");
		}

		const studentId = new StudentId(tokenData.userId);
		const student = await this.studentRepository.getStudent(studentId);

		if (!student) {
			throw new ApiValidationError("Invalid token");
		}

		const safeStudent: Omit<StudentEntity, "password"> = {
			id: student.id,
			firstName: student.firstName,
			lastName: student.lastName,
			email: student.email,
		};

		return safeStudent;
	}

	#tokenPayloadTypeGuard(payload: unknown): payload is StudentToken {
		return (
			typeof payload === "object" &&
			payload !== null &&
			"userId" in payload &&
			// biome-ignore lint/suspicious/noExplicitAny: <it is ok to use any in a typeguard to verity typeof>
			typeof (payload as any).userId === "string"
		);
	}
}
