import type { StudentEntity } from "../../domain/entities/Student/studentEntity";

export type SecureStudent = Omit<StudentEntity, "password">;
export type partialStudent = Partial<Omit<StudentEntity, "id">>;
export type RawStudent = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};
