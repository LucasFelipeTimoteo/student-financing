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
	appPort: number;
	documentationAppPort: number;
	nodeEnv: NodeEnvs;
	corsWhitelist: string;
	salt: number;
	accessTokenJwtSecret: string;
	refreshTokenTTLDays: number;
	accessTokenTTLMinutes: number;
	refreshTokenJwtSecret: string;
	databasePort: number;
	databaseName: string;
	databaseHost: string;
	databaseUser: string;
	databasePassword?: string;

	constructor(
		appEnvValidator: AppEnvValidator,
		public envValues: EnvValues,
	) {
		const validEnv = appEnvValidator.validate(envValues);
		this.nodeEnv = validEnv.NODE_ENV;
		this.appLocal = validEnv.APP_LOCAL;
		this.appPort = validEnv.APP_PORT;
		this.documentationAppPort = validEnv.DOCUMENTATION_APP_PORT;
		this.corsWhitelist = validEnv.CORS_WHITELIST;
		this.accessTokenJwtSecret = validEnv.ACCESS_TOKEN_JWT_SECRET;
		this.accessTokenTTLMinutes = validEnv.ACCESS_TOKEN_TTL_MINUTES;
		this.refreshTokenJwtSecret = validEnv.REFRESH_TOKEN_JWT_SECRET;
		this.refreshTokenTTLDays = validEnv.REFRESH_TOKEN_TTL_DAYS;
		this.salt = validEnv.SALT;
		this.databaseHost = validEnv.DATABASE_HOST;
		this.databaseName = validEnv.DATABASE_NAME;
		this.databaseUser = validEnv.DATABASE_USER;
		this.databasePassword = validEnv.DATABASE_PASSWORD;
		this.databasePort = validEnv.DATABASE_PORT;
	}

	getValidatedEnvValues() {
		const { envValues: _, ...validatedValues } = this;
		protectInstance(validatedValues, false);

		return validatedValues;
	}
}

// it Is not a problem to use type casting because it will be validated
const parsedEnvObj = dotenvEnvParser.parseEnvFileToObj(".env") as EnvValues;

export const appEnv = new AppEnv(
	appEnvValidatorZod,
	parsedEnvObj,
).getValidatedEnvValues();
