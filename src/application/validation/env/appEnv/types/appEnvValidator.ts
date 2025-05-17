import type { EnvValues } from "./appEnvTypes";

export interface AppEnvValidator {
	validate(env: EnvValues): EnvValues;
}
