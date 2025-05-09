import httpCompress from "compression";
import express, { type Response } from "express";
import helmet from "helmet";
import type { logger } from "../../../../application/logger/logger";
// import { ExpressErrorHandlerMiddleware } from "../middlewares/errorHandling/expressErrorHandlerMiddleware";
import { corsConfigMiddleware } from "../../middlewares/utils/cors/corsMiddlewareConfig";
import type { AuthRouter } from "../routers/auth/authRouter";

export class ExpressApp {
  constructor(
    private authRouter: AuthRouter,
    private logger: logger,
  ) { }

  exec() {
    const AuthRouter = this.authRouter.exec();
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(httpCompress());
    app.use(corsConfigMiddleware());
    app.use(AuthRouter);
    app.get("/health", this.#healthCheck);

    // const expressErrorHandling = new ExpressErrorHandlerMiddleware(
    // 	app,
    // 	this.logger,
    // );
    // expressErrorHandling.exec();

    return app;
  }

  #healthCheck(_: unknown, res: Response) {
    res.sendStatus(200);
  }
}