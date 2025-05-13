import type { Express, NextFunction, Response } from "express";
import { ApiError } from "../../../../../application/errors/api/apiError";
import { ApiValidationError } from "../../../../../application/errors/apiValidation/apiValidationError";
import type { appErrors } from "../../../../../application/errors/appErrors/appErrors";
import { ServerError } from "../../../../../application/errors/server/serverError";
import type { logger } from "../../../../../application/logger/logger";
import { JWTTokensError } from "../../../../../application/tokens/jwt/errors/JWTTokensError";
import { StudentError } from "../../../../../domain/entities/Student/errors/studentError";

export class ExpressErrorHandlerMiddleware {
	constructor(
		public app: Express,
		public logger: logger,
	) {}

	exec() {
		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof ServerError) {
					this.logger.error(err);
					res.status(err.statusCode || 500).json({
						message: "Server error. Cannot process the request",
					});

					if (!err.operational) return process.exit(1);
					return;
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof ApiError) {
					this.logger.error(err);

					res.status(err.statusCode || 500).json({
						message: err.message,
					});

					if (!err.operational) return process.exit(1);
					return;
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof ApiValidationError) {
					this.logger.error(err);
					res.status(err.statusCode || 500).json({
						message:
							err.message || "API Validation error. Cannot process the request",
					});

					if (!err.operational) return process.exit(1);
					return;
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				if (err instanceof StudentError || err instanceof JWTTokensError) {
					this.logger.error(err);
					return res.status(400).json({
						message: err.message,
					});
				}

				return next(err);
			},
		);

		this.app.use(
			(err: appErrors, _: unknown, res: Response, next: NextFunction) => {
				this.logger.error(err);
				return res.status(500).json({
					message: "Unexpected unknown error. Cannot process the request",
				});
			},
		);

		return this.app;
	}
}
