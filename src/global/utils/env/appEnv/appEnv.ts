import type {
	AppMachineType,
	EnvValues,
	NodeEnvs,
} from "../../../../application/validation/env/appEnv/types/appEnvTypes";
import type { AppEnvValidator } from "../../../../application/validation/env/appEnv/types/appEnvValidator";
import { protectInstance } from "../../../../domain/utils/protectInstance/protectinstance";
import { dotenvEnvParser } from "../../../../infra/parsers/dotenv/dotenvEnvparser";
import { appEnvValidatorZod } from "../../../../infra/validators/env/zod/appEnvValidatorZod";

export class AppEnv {
	appLocal: AppMachineType;
	appPort: string;
	documentationAppPort: string;
	nodeEnv: NodeEnvs;
	corsWhitelist: string;
	salt: string;
	accessTokenJwtSecret: string;
	refreshTokenTTLDays: string;
	accessTokenTTLMinutes: string;
	refreshTokenJwtSecret: string;
	databasePort: number;
	databaseName: string;
	databaseHost: string;
	databaseUser: string;
	databasePassword?: string;
	databaseUrl: string;

	constructor(
		appEnvValidator: AppEnvValidator,
		public envValues: EnvValues,
	) {
		this.appLocal = this.#appLocalValidation(
			this.envValues.APP_LOCAL,
			appEnvValidator,
		);
		this.nodeEnv = this.#nodeEnvValidation(
			this.envValues.NODE_ENV,
			appEnvValidator,
		);
		this.appPort = this.#numericStringValidation(
			this.envValues.APP_PORT,
			appEnvValidator,
		);
		this.corsWhitelist = this.#stringValidation(
			this.envValues.CORS_WHITELIST,
			appEnvValidator,
		);
		this.documentationAppPort = this.#numericStringValidation(
			this.envValues.DOCUMENTATION_APP_PORT,
			appEnvValidator,
		);

		this.refreshTokenTTLDays = this.#numericStringValidation(
			this.envValues.REFRESH_TOKEN_TTL_DAYS,
			appEnvValidator,
		);

		this.accessTokenTTLMinutes = this.#numericStringValidation(
			this.envValues.ACCESS_TOKEN_TTL_MINUTES,
			appEnvValidator,
		);

		this.salt = this.#numericStringValidation(
			this.envValues.SALT,
			appEnvValidator,
		);

		this.accessTokenJwtSecret = this.#stringValidation(
			this.envValues.ACCESS_TOKEN_JWT_SECRET,
			appEnvValidator,
		);

		this.refreshTokenJwtSecret = this.#stringValidation(
			this.envValues.REFRESH_TOKEN_JWT_SECRET,
			appEnvValidator,
		);

		this.databaseHost = this.#stringValidation(
			this.envValues.DATABASE_HOST,
			appEnvValidator,
		);

		this.databaseName = this.#stringValidation(
			this.envValues.DATABASE_NAME,
			appEnvValidator,
		);

		this.databasePassword = this.envValues.DATABASE_PASSWORD;

		this.databasePort = Number(
			this.#numericStringValidation(
				this.envValues.DATABASE_PORT,
				appEnvValidator,
			),
		);

		this.databaseUser = this.#stringValidation(
			this.envValues.DATABASE_USER,
			appEnvValidator,
		);

		this.databaseUrl = this.#stringValidation(
			this.envValues.DATABASE_URL,
			appEnvValidator,
		);
	}

	getValidatedEnvValues() {
		const { envValues: _, ...validatedValues } = this;
		protectInstance(validatedValues, false);

		return validatedValues;
	}

	#stringValidation(envVar: unknown, appEnvValidator: AppEnvValidator): string {
		return appEnvValidator.stringValidation(envVar);
	}

	#numericStringValidation(
		envVar: unknown,
		appEnvValidator: AppEnvValidator,
	): string {
		return appEnvValidator.numericStringValidation(envVar);
	}

	#appLocalValidation(
		machineLocalEnv: unknown,
		appEnvValidator: AppEnvValidator,
	): AppMachineType {
		return appEnvValidator.appLocalValidation(machineLocalEnv);
	}

	#nodeEnvValidation(
		nodeEnv: unknown,
		appEnvValidator: AppEnvValidator,
	): NodeEnvs {
		return appEnvValidator.nodeEnvValidation(nodeEnv);
	}
}

// it Is not a problem to use type casting because it will be validated
const parsedEnvObj = dotenvEnvParser.parseEnvFileToObj(".env") as EnvValues;

export const appEnv = new AppEnv(
	appEnvValidatorZod,
	parsedEnvObj,
).getValidatedEnvValues();
