import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { parse } from "dotenv";
import type { EnvParser } from "../../../application/parsers/env/envParser";

class DotenvEnvParser implements EnvParser {
	parseEnvFileToObj(envFilePath: string) {
		const resolvedPath = resolve(envFilePath);
		const envFile = readFileSync(resolvedPath);
		const parsedEnv = parse(envFile) as unknown;

		return parsedEnv;
	}
}

export const dotenvEnvParser = new DotenvEnvParser();
