import { DomainObjectError } from "../../../domain/errors/domainObjectsErrors/domainObjectErrors";

export class ServerError extends DomainObjectError {
	constructor(
		message: string,
		public statusCode = 500,
		public operational = true,
		public debugMessage?: string,
		public docs?: string,
	) {
		super(message);
		const { yellow, reset } = DomainObjectError.colors;
		this.name = `${yellow}ServerError${reset}`;
		Error.captureStackTrace(this, this.constructor);
	}
}
