import httpCompress from "compression";
import express, { type Response } from "express";
import helmet from "helmet";
import type { logger } from "../../../../application/logger/logger";
import { corsConfigMiddleware } from "../../middlewares/utils/cors/corsMiddlewareConfig";
import { ExpressErrorHandlerMiddleware } from "../middlewares/errorHandling/expressErrorHandlerMiddleware";
import type { AuthRouter } from "../routers/auth/authRouter";
import type { SimulationsRouter } from "../routers/simulations/simulationsRouter";
import type { StudentRouter } from "../routers/student/studentRouter";

export class ExpressApp {
	constructor(
		private authRouter: AuthRouter,
		private studentRouter: StudentRouter,
		private simulationRouter: SimulationsRouter,
		private logger: logger,
	) {}

	exec() {
		const AuthExpressRouter = this.authRouter.exec();
		const StudentExpressRouter = this.studentRouter.exec();
		const SimulatioExpressRouter = this.simulationRouter.exec();
		const app = express();

		app.use(express.json());
		app.use(helmet());
		app.use(httpCompress());
		app.use(corsConfigMiddleware());
		app.use(AuthExpressRouter);
		app.use(StudentExpressRouter);
		app.use(SimulatioExpressRouter);

		app.get("/health", this.#healthCheck);

		const expressErrorHandling = new ExpressErrorHandlerMiddleware(
			app,
			this.logger,
		);
		expressErrorHandling.exec();

		return app;
	}

	#healthCheck(_: unknown, res: Response) {
		res.sendStatus(200);
	}
}
