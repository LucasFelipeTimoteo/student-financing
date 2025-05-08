import { DomainObjectError } from "../../../../errors/domainObjectsErrors/domainObjectErrors";

export class FinancingSimulationError extends DomainObjectError {
  constructor(public message: string) {
    super(message);
    const { red, reset } = DomainObjectError.colors
    this.name = `${red}FinancingSimulationError${reset}`;
  }
}
