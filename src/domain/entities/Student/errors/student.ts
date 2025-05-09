import { DomainObjectError } from "../../../errors/domainObjectsErrors/domainObjectErrors";

export class StudentError extends DomainObjectError {
  constructor(public message: string) {
    super(message);
    const { red, reset } = DomainObjectError.colors
    this.name = `${red}StudentError${reset}`;
  }
}
