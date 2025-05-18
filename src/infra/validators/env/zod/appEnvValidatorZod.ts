import { z } from "zod";
import type { EnvValues } from "../../../../application/validation/env/appEnv/types/appEnvTypes";
import type { AppEnvValidator } from "../../../../application/validation/env/appEnv/types/appEnvValidator";

class AppEnvValidatorZod implements AppEnvValidator {
	validate(env: EnvValues): EnvValues {
		env.APP_PORT = Number(env.APP_PORT);
		env.DOCUMENTATION_APP_PORT = Number(env.DOCUMENTATION_APP_PORT);
		env.DATABASE_PORT = Number(env.DATABASE_PORT);
		env.SALT = Number(env.SALT);
		env.ACCESS_TOKEN_TTL_MINUTES = Number(env.ACCESS_TOKEN_TTL_MINUTES);
		env.REFRESH_TOKEN_TTL_DAYS = Number(env.REFRESH_TOKEN_TTL_DAYS);

		const schema = z.object({
			NODE_ENV: z.enum(["development", "production", "test"]),
			APP_LOCAL: z.enum(["docker", "local_machine"]),
			APP_PORT: z.number().min(1),
			DOCUMENTATION_APP_PORT: z.number().min(1),
			CORS_WHITELIST: z.string().min(1),
			ACCESS_TOKEN_JWT_SECRET: z.string().min(1),
			ACCESS_TOKEN_TTL_MINUTES: z.number().min(1),
			REFRESH_TOKEN_JWT_SECRET: z.string().min(1),
			REFRESH_TOKEN_TTL_DAYS: z.number().min(1),
			SALT: z.number().min(1),
			DATABASE_HOST: z.string().min(1),
			DATABASE_NAME: z.string().min(1),
			DATABASE_PORT: z.number().min(1),
			DATABASE_USER: z.string().min(1),
			// DATABASE_URL: z.string().min(1),
			DATABASE_PASSWORD: z.string().optional(),
		});

		const validatedEnv = schema.parse(env);
		return validatedEnv;
	}
}

export const appEnvValidatorZod = new AppEnvValidatorZod();
