import type { StudentError } from "../../../domain/entities/Student/errors/studentError";
import type { JWTTokensError } from "../../tokens/jwt/errors/JWTTokensError";
import type { ApiError } from "../api/apiError";
import type { ApiValidationError } from "../apiValidation/apiValidationError";
import type { ServerError } from "../server/serverError";

export type appErrors =
	| Error
	| ServerError
	| ApiError
	| ApiValidationError
	| StudentError
	| JWTTokensError;
