import type { IncomingMessage, Server, ServerResponse } from "node:http";
import type { DataSource } from "typeorm";

export type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;
export type EntrypointDatabaseClients = Promise<DataSource>;
