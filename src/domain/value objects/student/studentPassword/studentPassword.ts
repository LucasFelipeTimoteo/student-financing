import { StudentError } from "../../../entities/Student/errors/studentError";

export class StudentPassword {
	constructor(public readonly value: string) {
		if (!value) {
			throw new StudentError(`password is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new StudentError(
				`password should be a string, but received: ${value}`,
			);
		}

		if (value.length < 8) {
			throw new StudentError(
				`password should have at least 8 characters, but received ${value.length}`,
			);
		}
	}
}
