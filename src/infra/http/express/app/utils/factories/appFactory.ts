import { AuthController } from "../../../../../../adapters/controllers/auth/authController";
import { pinoLogger } from "../../../../../logger/pino/pinoLogger";
import { AuthRouteHandler } from "../../../routehandlers/auth/authRoutehandler";
import { AuthRouter } from "../../../routers/auth/authRouter";
import { ExpressApp } from "../../app";

export const Appfactory = (
  logger = pinoLogger,
  authController = new AuthController(logger),
  authRouteHandler = new AuthRouteHandler(authController),
  authRouter = new AuthRouter(authRouteHandler)
) => {

  const app = new ExpressApp(
    authRouter,
    logger
  );

  return app;
};
