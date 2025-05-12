import jwt from "jsonwebtoken";
import type {
	JWTTokens,
	StudentToken,
} from "../../../../application/tokens/jwt/JWTTokens";
import { JWTTokensError } from "../../../../application/tokens/jwt/errors/JWTTokensError";

export class JWTJsonWebToken implements JWTTokens {
	genToken(
		payload: string | Buffer | object,
		secret: string,
		ttl?: number,
	): string {
		const token = jwt.sign(payload, secret, { expiresIn: ttl });

		return token;
	}

	verifyToken(token: string, secret: string) {
		try {
			const isTokenCorrect = jwt.verify(token, secret);
			return isTokenCorrect;
		} catch (error) {
			throw new JWTTokensError("Fail to verify token. Invalid token");
		}
	}

	decodeToken(token: string): StudentToken {
		const decodedToken = jwt.decode(token);

		if (this.#isStudentToken(decodedToken)) {
			return decodedToken;
		}

		throw new JWTTokensError("Invalid Token. Cannot be decoded");
	}

	#isStudentToken(decodedToken: unknown): decodedToken is StudentToken {
		if (
			typeof decodedToken === "object" &&
			decodedToken !== null &&
			typeof (decodedToken as StudentToken).userId === "string"
		) {
			return true;
		}

		return false;
	}
}
