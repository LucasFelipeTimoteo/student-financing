export class DomainObjectError extends Error {
	static colors = {
		reset: "\x1b[0m",
		blue: "\x1b[36m",
		red: "\x1b[31m",
		yellow: "\x1b[33m",
		green: "\x1b[32m",
	};

	constructor(public message: string) {
		super(`\x1b[32m${message}aaaaaaa\x1b[0m`);

		Error.captureStackTrace(this, this.constructor);
	}
}
