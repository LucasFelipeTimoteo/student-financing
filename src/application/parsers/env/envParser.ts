export interface EnvParser {
	parseEnvFileToObj(envFilePath: string): unknown;
}
