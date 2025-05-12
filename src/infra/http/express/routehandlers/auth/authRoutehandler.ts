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
			const { email, password } = req.body;

			const loginResponseData = await this.authController.login(
				email,
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
			const { firstName, lastName, email, password } = req.body;

			const registerResponseData = await this.authController.register(
				firstName,
				lastName,
				email,
				password,
			);

			return res
				.status(registerResponseData.status)
				.json(registerResponseData.body);
		} catch (error) {
			next(error);
		}
	}
}
