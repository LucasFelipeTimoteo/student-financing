import type { logger } from "../../../application/logger/logger";
import type { PasswordHasher } from "../../../application/parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../../application/responses/general/message/messageResponse";
import type { TokensResponse } from "../../../application/responses/general/tokens/tokensResponse";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { LoginCase } from "../../../application/useCases/login/loginCase";
import { RegisterCase } from "../../../application/useCases/register/registerCase";
import type { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import type { StudentFirstName } from "../../../domain/value objects/student/studentFirstName/studentFirstName";
import type { StudentLastName } from "../../../domain/value objects/student/studentLastName/studentLastName";
import type { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";

import {
	type HttpResponse,
	httpResponsePresenter,
} from "../../presenters/http/response/httpResponsePresenter";

export class AuthController {
	constructor(
		private logger: logger,
		private jwt: JWTTokens,
		private passwordHasher: PasswordHasher,
		private studentRepository: StudentRepository,
	) {}

	async login(
		email: StudentEmail,
		password: StudentPassword,
	): Promise<HttpResponse<TokensResponse | MessageResponse>> {
		const loginCase = new LoginCase(
			email,
			password,
			this.jwt,
			this.logger,
			this.studentRepository,
			this.passwordHasher,
		);
		const loginResult = await loginCase.login();

		if ("message" in loginResult) {
			return httpResponsePresenter.badRequest(loginResult);
		}

		return httpResponsePresenter.ok(loginResult);
	}

	async register(
		firstName: StudentFirstName,
		lastName: StudentLastName,
		email: StudentEmail,
		password: StudentPassword,
	): Promise<HttpResponse<TokensResponse | MessageResponse>> {
		const registerCase = new RegisterCase(
			firstName,
			lastName,
			email,
			password,
			this.jwt,
			this.logger,
			this.passwordHasher,
			this.studentRepository,
		);
		const registerResult = await registerCase.register();

		return httpResponsePresenter.ok(registerResult);
	}
}
