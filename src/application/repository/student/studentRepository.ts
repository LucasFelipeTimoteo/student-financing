import type { StudentEntity } from "../../../domain/entities/Student/studentEntity";

export interface StudentRepository {
	login(
		username: string,
		hashedPassword: string,
	): Promise<StudentEntity | null>;
	register(
		username: string,
		hashedPassword: string,
	): Promise<StudentEntity | null>;
}
