import type { DataSource } from "typeorm";
import { AuthController } from "../../../../../../adapters/controllers/auth/authController";
import { SimulationsController } from "../../../../../../adapters/controllers/simulations/simulationsController";
import { StudentController } from "../../../../../../adapters/controllers/student/studentController";
import type { logger } from "../../../../../../application/logger/logger";
import { HashPasswordBcrypt } from "../../../../../parsers/password/hashing/bcrypt/passwordHasherBcrypt";
import { SimulationsRepositoryTypeORM } from "../../../../../repository/simulationsRepositoryTypeORM";
import { StudentRepositoryTypeORM } from "../../../../../repository/studentRepositoryTypeORM";
import { JWTJsonWebToken } from "../../../../../tokens/jwt/jsonWebTokenLib/JWTJsonWebToken";
import { AuthRouteHandler } from "../../../routehandlers/auth/authRoutehandler";
import { SimulationsRouteHandler } from "../../../routehandlers/simulations/simulationsRouteHandler";
import { StudentRouteHandler } from "../../../routehandlers/student/studentRouteHandler";
import { AuthRouter } from "../../../routers/auth/authRouter";
import { SimulationsRouter } from "../../../routers/simulations/simulationsRouter";
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
	studentController = new StudentController(
		logger,
		jwt,
		studentRepository,
		passwordHasher,
	),
	studentRouteHandler = new StudentRouteHandler(studentController),
	studentRouter = new StudentRouter(studentRouteHandler),

	simulationsRepository = new SimulationsRepositoryTypeORM(logger, client),
	simulationsController = new SimulationsController(
		logger,
		jwt,
		simulationsRepository,
	),
	simulationsRouteHandler = new SimulationsRouteHandler(simulationsController),
	simulationsRouter = new SimulationsRouter(simulationsRouteHandler),
) => {
	const app = new ExpressApp(
		authRouter,
		studentRouter,
		simulationsRouter,
		logger,
	);

	return app;
};
