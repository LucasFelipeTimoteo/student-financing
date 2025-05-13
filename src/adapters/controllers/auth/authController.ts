import type { logger } from "../../../application/logger/logger";
import type { PasswordHasher } from "../../../application/parsers/password/hasing/passwordHasher";
import type { StudentRepository } from "../../../application/repository/student/studentRepository";
import type { MessageResponse } from "../../../application/responses/general/message/messageResponse";
import type { TokensResponse } from "../../../application/responses/general/tokens/tokensResponse";
import type { JWTTokens } from "../../../application/tokens/jwt/JWTTokens";
import { LoginCase } from "../../../application/useCases/login/loginCase";
import { RegisterCase } from "../../../application/useCases/register/registerCase";
import { StudentError } from "../../../domain/entities/Student/errors/studentError";
import { StudentEmail } from "../../../domain/value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentLastName } from "../../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../domain/value objects/student/studentPassword/studentPassword";

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
		email: string,
		password: string,
	): Promise<HttpResponse<TokensResponse | MessageResponse>> {
		try {
			const validEmail = new StudentEmail(email);
			const validPassword = new StudentPassword(password);

			const loginCase = new LoginCase(
				validEmail,
				validPassword,
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
		} catch (error) {
			if (error instanceof StudentError) {
				return httpResponsePresenter.badRequest({ message: error.message });
			}

			throw error;
		}
	}

	async register(
		firstName: string,
		lastName: string,
		email: string,
		password: string,
	): Promise<HttpResponse<TokensResponse | MessageResponse>> {
		try {
			const validFirstName = new StudentFirstName(firstName);
			const validLastName = new StudentLastName(lastName);
			const validEmail = new StudentEmail(email);
			const validPassword = new StudentPassword(password);

			const registerCase = new RegisterCase(
				validFirstName,
				validLastName,
				validEmail,
				validPassword,
				this.jwt,
				this.logger,
				this.passwordHasher,
				this.studentRepository,
			);
			const registerResult = await registerCase.register();

			if ("message" in registerResult) {
				return httpResponsePresenter.badRequest(registerResult);
			}

			return httpResponsePresenter.created(registerResult);
		} catch (error) {
			if (error instanceof StudentError) {
				this.logger.error(error);
				return httpResponsePresenter.badRequest({ message: error.message });
			}

			throw error;
		}
	}
}
