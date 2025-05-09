
import { pinoLogger } from "../../logger/pino/pinoLogger";
import { Appfactory } from "./app/utils/factories/appFactory";
import { ExpressEntryPoint } from "./entrypoint";

const app = Appfactory()

const expressEntryPoint = new ExpressEntryPoint(
  app,
  pinoLogger,
);

expressEntryPoint.listen();