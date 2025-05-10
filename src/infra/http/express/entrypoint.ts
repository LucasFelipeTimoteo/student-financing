import type { logger } from "../../../application/logger/logger";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";
import type { ExpressApp } from "./app/app";
// import { GracefullShutdownStrategyExecutor } from "../utils/gracefullShutdown/gracefullShutdownHandler";
// import { gracefullShutdownHandlerClientSelector } from "../utils/gracefullShutdown/strategies/gracefullShutdownHandlerClientSelector";
// import type { ExpressApp } from "./app/app";
import type {
  EntrypointDatabaseClients,
  // EntrypointCacheDatabaseClients,
  // EntrypointDatabaseClients,
  HttpServer,
} from "./types/entrypoint/entrypointTypes";

export class ExpressEntryPoint {
  server: HttpServer | null = null;
  port = appEnv.appPort;
  listenMessage = `Running server on port ${this.port}`;
  gracefullShutdownSigs: NodeJS.Signals[] = ["SIGTERM", "SIGINT"];

  constructor(
    private app: ExpressApp,
    private logger: logger,
    private mainDatabase: EntrypointDatabaseClients,
  ) { }

  async listen() {
    const { "0": db, } = await this.#startDatabases(this.mainDatabase);
    const app = this.#configApp();
    const server = app.listen(this.port, () =>
      this.logger.info(this.listenMessage),
    );

    this.server = server;
    // this.gracefullShutdown(cacheDatabase, mainDatabase, server);
  }

  #configApp() {
    return this.app.exec();
  }

  async #startDatabases(dbClient: EntrypointDatabaseClients) {
    const databaseClients = [dbClient];
    return await Promise.all(databaseClients);
  }

  // async gracefullShutdown(
  //   cacheDatabase: Awaited<EntrypointCacheDatabaseClients>,
  //   mainDatabase: Awaited<EntrypointDatabaseClients>,
  //   server: HttpServer,
  // ) {
  //   const mainDataBaseseClientStrategy =
  //     await gracefullShutdownHandlerClientSelector("mongoose", mainDatabase);

  //   const cachedatabaseClientStrategy =
  //     await gracefullShutdownHandlerClientSelector("redis", cacheDatabase);

  //   const databaseClientShutdown = new GracefullShutdownStrategyExecutor(
  //     mainDataBaseseClientStrategy,
  //   );

  //   const cacheDatabaseClientShutdown = new GracefullShutdownStrategyExecutor(
  //     cachedatabaseClientStrategy,
  //   );

  //   for (const signal of this.gracefullShutdownSigs) {
  //     process.on(signal, async () =>
  //       server.close(() => {
  //         databaseClientShutdown.exec();
  //         cacheDatabaseClientShutdown.exec();

  //         this.logger.info("Gracefully close server");
  //         process.exit(0);
  //       }),
  //     );
  //   }
  // }
}
