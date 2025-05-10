import { StudentError } from "../../../entities/Student/errors/student";

export class StudentLastName {
  constructor(public readonly value: string) {
    if (!value) {
      throw new StudentError(`Last name is required, but received: ${value}`);
    }

    if (typeof value !== "string") {
      throw new StudentError(`Last name should be a string, but received: ${value}`);
    }

    if (value.length < 2) {
      throw new StudentError(`Last name should have a length of at least 2, but received ${value.length}`);
    }
  }
}