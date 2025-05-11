import bcrypt from "bcryptjs";
import type { PasswordHasher } from "../../../../../application/parsers/password/hasing/passwordHasher";
import type { StudentPassword } from "../../../../../domain/value objects/student/studentPassword/studentPassword";

export class HashPasswordBcrypt implements PasswordHasher {
	async genSalt(rounds: number): Promise<string> {
		const salt = await bcrypt.genSalt(rounds);
		return salt;
	}

	genSaltSync(rounds: number): string {
		const salt = bcrypt.genSaltSync(rounds);
		return salt;
	}

	async hashAsync(text: StudentPassword, salt: string): Promise<string> {
		const hash = await bcrypt.hash(text.value, salt);
		return hash;
	}

	hashSync(text: StudentPassword, salt: string): string {
		const hash = bcrypt.hashSync(text.value, salt);
		return hash;
	}

	async compare(text: StudentPassword, hash: string): Promise<boolean> {
		const isEqual = await bcrypt.compare(text.value, hash);
		return isEqual;
	}
}
