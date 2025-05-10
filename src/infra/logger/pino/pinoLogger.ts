import pino from "pino";
import type { logger } from "../../../application/logger/logger";
import { appEnv } from "../../../global/utils/env/appEnv/appEnv";

class PinoLogger implements logger {
	#isDevelopment = appEnv.nodeEnv === "development";
	#isTest = process.env.NODE_ENV === "test" || appEnv.nodeEnv === "test";

	#logger = pino({
		level: this.#isTest ? "silent" : this.#isDevelopment ? "debug" : "info",

		...(this.#isDevelopment && { transport: { target: "pino-pretty" } }),
	});

	debug(msg: unknown) {
		this.#logger.debug(msg);
	}
	info(msg: unknown) {
		this.#logger.info(msg);
	}
	warn(msg: unknown) {
		this.#logger.warn(msg);
	}
	error(msg: unknown) {
		this.#logger.error(msg);
	}
	fatal(msg: unknown) {
		this.#logger.fatal(msg);
	}
}

export const pinoLogger = new PinoLogger();
