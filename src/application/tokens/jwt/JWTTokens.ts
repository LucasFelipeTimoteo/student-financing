export type StudentToken = {
	userId: string;
};

export type JwtErrorResponse = { error: string };

export interface JWTTokens {
	genToken(
		payload: string | Buffer | object,
		secret: string,
		ttl?: number,
	): string;
	verifyToken(
		token: string,
		secret: string,
	): string | object | JwtErrorResponse;
	decodeToken(token: string): StudentToken | JwtErrorResponse;
}
