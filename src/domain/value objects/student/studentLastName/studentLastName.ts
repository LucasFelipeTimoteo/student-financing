import { StudentError } from "../../../entities/Student/errors/studentError";

export class StudentLastName {
	constructor(public readonly value: string) {
		if (!value) {
			throw new StudentError(`lastName is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new StudentError(
				`lastName should be a string, but received: ${value}`,
			);
		}

		if (value.length < 2) {
			throw new StudentError(
				`lastName should have a length of at least 2, but received ${value.length} with value: ${value}`,
			);
		}
	}
}
