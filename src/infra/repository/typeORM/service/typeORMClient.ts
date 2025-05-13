import "reflect-metadata";
import { DataSource } from "typeorm";
import type { logger } from "../../../../application/logger/logger";
import { appEnv } from "../../../../global/utils/env/appEnv/appEnv";
import { Simulation } from "../entity/Simulation";
import { Student } from "../entity/Student";

export class TypeORMClient {
	AppDataSource: DataSource;

	constructor(
		private logger: logger,
		public dbConfig?: { database: string },
	) {
		this.AppDataSource = new DataSource({
			type: "postgres",
			host: appEnv.appLocal === "docker" ? appEnv.databaseHost : "localhost",
			port: appEnv.databasePort,
			username: appEnv.databaseUser,
			password: appEnv.databasePassword,
			database: dbConfig?.database || appEnv.databaseName,
			synchronize: appEnv.nodeEnv !== "production",
			logging: false,
			entities: [Student, Simulation],
			migrations: [],
			subscribers: [],
		});
	}

	async initialize() {
		this.logger.info(
			"Starting database with TypeORM...\n-----------------------------------",
		);
		const dbClient = await this.AppDataSource.initialize();
		this.logger.info("Connected to database with TypeORM");

		return dbClient;
	}
}
