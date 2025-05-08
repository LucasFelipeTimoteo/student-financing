export type EnvValues = {
  APP_LOCAL: string;
  APP_PORT: string;
  DOCUMENTATION_APP_PORT: string;
  NODE_ENV: string;
  CORS_WHITELIST: string;
  ACCESS_TOKEN_JWT_SECRET: string;
  REFRESH_TOKEN_JWT_SECRET: string;
  REFRESH_TOKEN_TTL_DAYS: string;
  ACCESS_TOKEN_TTL_MINUTES: string;
  SALT: string;
};

export type NodeEnvs = "production" | "development" | "test";
export type AppMachineType = "docker" | "local_machine";
