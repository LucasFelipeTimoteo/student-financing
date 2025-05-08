import { StudentError } from "./errors/student";

export class StudentEntity {
  constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {
    this.#validateId();
    this.#validateName();
    this.#validateLastName();
    this.#validateEmail();
    this.#validatePassword();
  }

  #validateId() {
    if (!this.id) {
      throw new StudentError(`ID is required, but received: ${this.id}`);
    }

    if (typeof this.id !== "string") {
      throw new StudentError(`ID should be a string, but received: ${this.id}`);
    }

    if (this.id.length < 1) {
      throw new StudentError(`ID should have a length greater than 0, but received ${this.id.length}`);
    }
  }

  #validateName() {
    if (!this.name) {
      throw new StudentError(`Name is required, but received: ${this.name}`);
    }

    if (typeof this.name !== "string") {
      throw new StudentError(`Name should be a string, but received: ${this.name}`);
    }

    if (this.name.length < 2) {
      throw new StudentError(`Name should have a length greater than or equal 2, but received ${this.name.length}`);
    }
  }

  #validateLastName() {
    if (!this.lastName) {
      throw new StudentError(`Last name is required, but received: ${this.lastName}`);
    }

    if (typeof this.lastName !== "string") {
      throw new StudentError(`Last name should be a string, but received: ${this.lastName}`);
    }

    if (this.lastName.length < 2) {
      throw new StudentError(`Last name should have a length greater than or equal 2, but received ${this.lastName.length}`);
    }
  }

  #validateEmail() {
    if (!this.email) {
      throw new StudentError(`Email is required, but received: ${this.email}`);
    }

    if (typeof this.email !== "string") {
      throw new StudentError(`Email should be a string, but received: ${this.email}`);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new StudentError(`Email should be a valid email address, but received: ${this.email}`);
    }
  }

  #validatePassword() {
    if (!this.password) {
      throw new StudentError(`Password is required, but received: ${this.password}`);
    }

    if (typeof this.password !== "string") {
      throw new StudentError(`Password should be a string, but received: ${this.password}`);
    }

    if (this.password.length < 8) {
      throw new StudentError(`Password should have a length of at least 8 characters, but received ${this.password.length}`);
    }
  }
}