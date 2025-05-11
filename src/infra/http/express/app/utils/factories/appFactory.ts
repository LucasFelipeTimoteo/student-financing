import type { DataSource } from "typeorm";
import { AuthController } from "../../../../../../adapters/controllers/auth/authController";
import { StudentController } from "../../../../../../adapters/controllers/student/studentController";
import type { logger } from "../../../../../../application/logger/logger";
import { HashPasswordBcrypt } from "../../../../../parsers/password/hashing/bcrypt/passwordHasherBcrypt";
import { StudentRepositoryTypeORM } from "../../../../../repository/studentRepositoryTypeORM";
import { JWTJsonWebToken } from "../../../../../tokens/jwt/jsonWebTokenLib/JWTJsonWebToken";
import { AuthRouteHandler } from "../../../routehandlers/auth/authRoutehandler";
import { StudentRouteHandler } from "../../../routehandlers/student/studentRouteHandler";
import { AuthRouter } from "../../../routers/auth/authRouter";
import { StudentRouter } from "../../../routers/student/studentRouter";
import { ExpressApp } from "../../app";

export const Appfactory = (
	logger: logger,
	client: Promise<DataSource>,
	jwt = new JWTJsonWebToken(),
	passwordHasher = new HashPasswordBcrypt(),
	studentRepository = new StudentRepositoryTypeORM(logger, client),
	authController = new AuthController(
		logger,
		jwt,
		passwordHasher,
		studentRepository,
	),
	authRouteHandler = new AuthRouteHandler(authController),
	authRouter = new AuthRouter(authRouteHandler),
	studentController = new StudentController(logger, jwt, studentRepository),
	studentRouteHandler = new StudentRouteHandler(studentController),
	studentRouter = new StudentRouter(studentRouteHandler),
) => {
	const app = new ExpressApp(authRouter, studentRouter, logger);

	return app;
};
