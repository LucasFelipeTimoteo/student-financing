import type { NextFunction, Response } from "express";
import type { AuthController } from "../../../../../adapters/controllers/auth/authController";
import { StudentEmail } from "../../../../../domain/value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../../../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentLastName } from "../../../../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../../../domain/value objects/student/studentPassword/studentPassword";
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
			const { email, password } = req.body;

			const validEmail = new StudentEmail(email);
			const validPassword = new StudentPassword(password);

			const loginResponseData = await this.authController.login(
				validEmail,
				validPassword,
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
			const { firstName, lastName, email, password } = req.body;

			const validFirstName = new StudentFirstName(firstName);
			const validLastName = new StudentLastName(lastName);
			const validEmail = new StudentEmail(email);
			const validPassword = new StudentPassword(password);

			const registerResponseData = await this.authController.register(
				validFirstName,
				validLastName,
				validEmail,
				validPassword,
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
