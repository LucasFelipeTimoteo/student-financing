import type { StudentPassword } from "../../../../domain/value objects/student/studentPassword/studentPassword";

export interface PasswordHasher {
	genSalt(rounds: number): Promise<string>;
	genSaltSync(rounds: number): string;
	hashAsync(text: StudentPassword, salt: string): Promise<string>;
	hashSync(text: StudentPassword, salt: string): string;
	compare(text: StudentPassword, hash: string): Promise<boolean>;
}
