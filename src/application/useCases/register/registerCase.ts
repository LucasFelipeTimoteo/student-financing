import type { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import type { StudentFirstName } from "../../../domain/value objects/student/studentFirstName/studentFirstName";
import type { StudentLastName } from "../../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { logger } from "../../logger/logger";
import type { PasswordHasher } from "../../parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../repository/student/studentRepository";
import type { JWTTokens } from "../../tokens/jwt/JWTTokens";

export class RegisterCase {
	constructor(
		public firstName: StudentFirstName,
		public lastName: StudentLastName,
		public email: StudentEmail,
		public password: StudentPassword,
		private JWTTokens: JWTTokens,
		private logger: logger,
		private passwordHasher: PasswordHasher,
		private studentRepository: StudentRepository,
	) {}

	async register() {
		const hashSalt = await this.passwordHasher.genSalt(Number(appEnv.salt));
		const hashedPasswordRaw = await this.passwordHasher.hashAsync(
			this.password,
			hashSalt,
		);
		const hashedPassword = new StudentPassword(hashedPasswordRaw);

		const registerResult = await this.studentRepository.register(
			this.firstName,
			this.lastName,
			this.email,
			hashedPassword,
		);

		// if ("message" in registerResult) {
		//   return registerResult; // is error message
		// }

		this.logger.debug(`Successfully registered user: ${registerResult.value}`);

		const accessTokenTTLInSeconds = Number(appEnv.accessTokenTTLMinutes) * 60;
		const refreshTokenTTLInSeconds =
			Number(appEnv.refreshTokenTTLDays) * 24 * 60 * 60;

		const tokenPayload = { userId: registerResult.value };
		const accessToken = this.JWTTokens.genToken(
			tokenPayload,
			appEnv.accessTokenJwtSecret,
			accessTokenTTLInSeconds,
		);
		const refreshToken = this.JWTTokens.genToken(
			tokenPayload,
			appEnv.refreshTokenJwtSecret,
			refreshTokenTTLInSeconds,
		);

		return { accessToken, refreshToken };
	}
}
