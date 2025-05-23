import type { StudentEntity } from "../../../domain/entities/Student/studentEntity";
import { StudentId } from "../../../domain/value objects/student/studentId/studentId";
import { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { logger } from "../../logger/logger";
import type { PasswordHasher } from "../../parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../repository/student/studentRepository";
import type { JWTTokens, StudentToken } from "../../tokens/jwt/JWTTokens";
import { JWTTokensError } from "../../tokens/jwt/errors/JWTTokensError";

export class EditStudentCase {
	constructor(
		private partialStudent: Partial<Omit<StudentEntity, "id">>,
		private accessToken: string,
		private logger: logger,
		private studentRepository: StudentRepository,
		private jwtTokens: JWTTokens,
		private passwordHasher: PasswordHasher,
	) {}

	async edit() {
		const tokenData = this.jwtTokens.verifyToken(
			this.accessToken,
			appEnv.accessTokenJwtSecret,
		);
		if (!this.#tokenPayloadTypeGuard(tokenData)) {
			return JWTTokensError.invalidTokenResponse;
		}

		const studentId = new StudentId(tokenData.userId);
		const parsedPartialStudent = { ...this.partialStudent };
		if (this.partialStudent.password?.value) {
			const salt = this.passwordHasher.genSaltSync(appEnv.salt);
			const hashedPassword = this.passwordHasher.hashSync(
				this.partialStudent.password.value,
				salt,
			);
			this.logger.debug("Successfully hashed new password");
			parsedPartialStudent.password = new StudentPassword(hashedPassword);
		}
		const editedStudent = await this.studentRepository.editStudent(
			parsedPartialStudent,
			studentId,
		);

		return editedStudent;
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
