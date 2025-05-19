export class JWTTokensError extends Error {
	static invalidTokenResponse = { message: "Invalid Token" };

	constructor(message: string) {
		super(message);
		this.name = "JWTTokensError";
	}
}
