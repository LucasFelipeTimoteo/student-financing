import "reflect-metadata"
import { DataSource } from "typeorm"
import type { logger } from "../../../../application/logger/logger"
import { appEnv } from "../../../../global/utils/env/appEnv/appEnv"
import { User } from "../entity/User"

export class TypeORMClient {
    AppDataSource = new DataSource({
        type: "postgres",
        host: appEnv.appLocal === "docker" ? appEnv.databaseHost : 'localhost',
        port: appEnv.databasePort,
        username: appEnv.databaseUser,
        password: appEnv.databasePassword,
        database: appEnv.databaseName,
        synchronize: true,
        logging: false,
        entities: [User],
        migrations: [],
        subscribers: [],
    })

    constructor(private logger: logger) { }

    async initialize() {
        this.logger.info("Starting database with TypeORM...\n-----------------------------------")
        const dbClient = await this.AppDataSource.initialize()
        this.logger.info("Connected to database with TypeORM")

        return dbClient
    }
}
