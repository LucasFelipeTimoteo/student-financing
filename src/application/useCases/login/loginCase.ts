import type { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import type { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { logger } from "../../logger/logger";
import type { PasswordHasher } from "../../parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../repository/student/studentRepository";
import type { MessageResponse } from "../../responses/general/message/messageResponse";
import type { TokensResponse } from "../../responses/general/tokens/tokensResponse";
import type { JWTTokens } from "../../tokens/jwt/JWTTokens";

export class LoginCase {
	constructor(
		private email: StudentEmail,
		private password: StudentPassword,
		private JWTTokens: JWTTokens,
		private logger: logger,
		private studentRepository: StudentRepository,
		private passwordHasher: PasswordHasher,
	) {}

	async login(): Promise<MessageResponse | TokensResponse> {
		const loginResult = await this.studentRepository.login(this.email);

		if ("message" in loginResult) {
			return loginResult;
		}

		const isPasswordCorrect = await this.passwordHasher.compare(
			this.password.value,
			loginResult.password.value,
		);

		if (!isPasswordCorrect) {
			return { message: "Invalid credentials. Incorrect e-mail or password" };
		}

		this.logger.debug(`Successfully login with user: ${loginResult.id.value}`);

		const accessTokenTTLInSeconds = appEnv.accessTokenTTLMinutes * 60;
		const refreshTokenTTLInSeconds = appEnv.refreshTokenTTLDays * 24 * 60 * 60;

		const tokenPayload = { userId: loginResult.id.value };
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
