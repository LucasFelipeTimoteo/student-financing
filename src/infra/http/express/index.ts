import { pinoLogger } from "../../logger/pino/pinoLogger";
import { TypeORMClient } from "../../repository/typeORM/service/typeORMClient";
import { Appfactory } from "./app/utils/factories/appFactory";
import { ExpressEntryPoint } from "./entrypoint";

const typeORMClient = new TypeORMClient(pinoLogger).initialize();
const app = Appfactory(pinoLogger, typeORMClient);

const expressEntryPoint = new ExpressEntryPoint(app, pinoLogger, typeORMClient);

expressEntryPoint.listen();
