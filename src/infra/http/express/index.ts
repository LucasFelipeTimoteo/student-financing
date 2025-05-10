
import { pinoLogger } from "../../logger/pino/pinoLogger";
import { TypeORMClient } from "../../repository/typeORM/service/typeORMClient";
import { Appfactory } from "./app/utils/factories/appFactory";
import { ExpressEntryPoint } from "./entrypoint";

const app = Appfactory()
const typeORMClientInitializer = new TypeORMClient(pinoLogger).initialize()

const expressEntryPoint = new ExpressEntryPoint(
  app,
  pinoLogger,
  typeORMClientInitializer
);

expressEntryPoint.listen();