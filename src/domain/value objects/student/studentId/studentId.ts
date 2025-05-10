import { StudentError } from "../../../entities/Student/errors/student";

export class StudentId {
  constructor(public readonly value: string) {
    if (!value) {
      throw new StudentError(`ID is required, but received: ${value}`);
    }

    if (typeof value !== "string") {
      throw new StudentError(`ID should be a string, but received: ${value}`);
    }

    if (value.length < 1) {
      throw new StudentError(`ID should have a length greater than 0, but received ${value.length}`);
    }
  }
}