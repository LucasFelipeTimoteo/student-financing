import { StudentError } from "../../../entities/Student/errors/student";

export class StudentFirstName {
	constructor(public readonly value: string) {
		if (!value) {
			throw new StudentError(`firstName is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new StudentError(
				`firstName should be a string, but received: ${value}`,
			);
		}

		if (value.length < 2) {
			throw new StudentError(
				`firstName should have a length of at least 2, but received ${value.length}`,
			);
		}
	}
}
