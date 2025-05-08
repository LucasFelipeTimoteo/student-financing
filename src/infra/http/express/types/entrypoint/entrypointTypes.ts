import type { IncomingMessage, Server, ServerResponse } from "node:http";

export type HttpServer = Server<typeof IncomingMessage, typeof ServerResponse>;