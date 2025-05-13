export type EnvValues = {
	APP_LOCAL: AppMachineType;
	APP_PORT: number;
	DOCUMENTATION_APP_PORT: number;
	NODE_ENV: NodeEnvs;
	CORS_WHITELIST: string;
	ACCESS_TOKEN_JWT_SECRET: string;
	REFRESH_TOKEN_JWT_SECRET: string;
	REFRESH_TOKEN_TTL_DAYS: number;
	ACCESS_TOKEN_TTL_MINUTES: number;
	SALT: number;
	DATABASE_PORT: number;
	DATABASE_NAME: string;
	DATABASE_HOST: string;
	DATABASE_USER: string;
	DATABASE_PASSWORD?: string;
	// DATABASE_URL: string;
};

export type NodeEnvs = "production" | "development" | "test";
export type AppMachineType = "docker" | "local_machine";
