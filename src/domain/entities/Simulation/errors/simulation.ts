import { DomainObjectError } from "../../../errors/domainObjectsErrors/domainObjectErrors";

export class SimulationError extends DomainObjectError {
	constructor(public message: string) {
		super(message);
		const { red, reset } = DomainObjectError.colors;
		this.name = `${red}SimulationError${reset}`;
	}
}
