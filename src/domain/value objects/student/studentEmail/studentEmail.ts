import { StudentError } from "../../../entities/Student/errors/student";

export class StudentEmail {
	constructor(public readonly value: string) {
		if (!value) {
			throw new StudentError(`Email is required, but received: ${value}`);
		}

		if (typeof value !== "string") {
			throw new StudentError(
				`Email should be a string, but received: ${value}`,
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			throw new StudentError(`Email should be valid, but received: ${value}`);
		}
	}
}
