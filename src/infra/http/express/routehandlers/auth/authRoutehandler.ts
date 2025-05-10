import type { NextFunction, Response } from "express";
import type { AuthController } from "../../../../../adapters/controllers/auth/authController";
import type {
	LoginExpressRequest,
	RegisterExpressRequest,
} from "./types/customAuthRequest";

export class AuthRouteHandler {
	constructor(private authController: AuthController) {}

	async login(
		this: AuthRouteHandler,
		req: LoginExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { username, password } = req.body;

			const loginResponseData = await this.authController.login(
				username,
				password,
			);

			return res.status(loginResponseData.status).json(loginResponseData.body);
		} catch (error) {
			next(error);
		}
	}

	async register(
		this: AuthRouteHandler,
		req: RegisterExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { username, password } = req.body;

			const registerResponseData = await this.authController.register(
				username,
				password,
			);

			return res
				.status(registerResponseData.status)
				.json(registerResponseData.body);
		} catch (error) {
			next(error);
		}
	}

	// async accesstokenRefresh(
	// 	this: usersRouteHandlerExpress,
	// 	req: AccessTokenRefreshExpressRequest,
	// 	res: Response,
	// 	next: NextFunction,
	// ) {
	// 	try {
	// 		const { expiredToken, refreshToken } = req.body;
	// 		const accessTokenRefreshResponseData =
	// 			await this.UsersController.accessTokenRefresh(
	// 				expiredToken,
	// 				refreshToken,
	// 			);

	// 		return res
	// 			.status(accessTokenRefreshResponseData.status)
	// 			.json(accessTokenRefreshResponseData.body);
	// 	} catch (error) {
	// 		next(error);
	// 	}
	// }
}
