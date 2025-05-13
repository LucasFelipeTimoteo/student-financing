import jwt from "jsonwebtoken";
import type {
	JWTTokens,
	JwtErrorResponse,
	StudentToken,
} from "../../../../application/tokens/jwt/JWTTokens";

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
			return { error: "Fail to verify token. Invalid token" };
		}
	}

	decodeToken(token: string): StudentToken | JwtErrorResponse {
		const decodedToken = jwt.decode(token);

		if (this.#isStudentToken(decodedToken)) {
			return decodedToken;
		}

		return { error: "Invalid Token. Cannot be decoded" };
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
