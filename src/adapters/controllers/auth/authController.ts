import type { logger } from "../../../application/logger/logger";
import { LoginCase } from "../../../application/useCases/login/loginCase";
import { RegisterCase } from "../../../application/useCases/register/registerCase";
import {
	type HttpResponse,
	httpResponsePresenter,
} from "../../presenters/http/response/httpResponsePresenter";
// import { LoginCase } from "../../../application/useCases/login/loginCase";

export class AuthController {
	constructor(private logger: logger) {}

	async accessTokenRefresh(
		expiredAccessToken: string,
		refreshToken: string,
	): Promise<HttpResponse<{ newAccessToken: string }>> {
		// const accessTokenRefreshCase = new AccessTokenRefreshCase(
		// 	this.usersCacheRepository,
		// 	this.logger,
		// 	this.JWTTokens,
		// );
		// const newAccessToken = await accessTokenRefreshCase.refresh(
		// 	expiredAccessToken,
		// 	refreshToken,
		// );

		return httpResponsePresenter.ok({ newAccessToken: "example_token" });
	}

	async login(
		username: string,
		password: string,
	): Promise<
		HttpResponse<
			{ accessToken: string; refreshToken: string } | { message: string }
		>
	> {
		// const validatedUsername = new UserName(username).username;
		// const validatedPassword = new UserPassword(password).password;

		const loginCase = new LoginCase();
		const userTokens = await loginCase.login();

		if (!userTokens) {
			return httpResponsePresenter.badRequest({
				message: "Invalid credential",
			});
		}

		return httpResponsePresenter.ok(userTokens);
	}

	async register(
		username: string,
		password: string,
	): Promise<
		HttpResponse<
			{ accessToken: string; refreshToken: string } | { message: string }
		>
	> {
		// const validatedUsername = new UserName(username).username;
		// const validatedPassword = new UserPassword(password).password;

		const registerCase = new RegisterCase();
		const userTokens = await registerCase.register();

		if (!userTokens) {
			return httpResponsePresenter.badRequest({
				message: "Invalid credential",
			});
		}

		return httpResponsePresenter.ok(userTokens);
	}
}
