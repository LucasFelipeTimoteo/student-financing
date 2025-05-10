import type { DataSource } from "typeorm";
import type { logger } from "../../../../../../application/logger/logger";
import type { GracefullShutdownHandlerStrategyType } from "../../types/gracefullShutdownHandlerStrategy";

export class GracefullShutdownTypeORMStrategy
	implements GracefullShutdownHandlerStrategyType
{
	constructor(
		private typeORMClient: DataSource,
		private logger: logger,
	) {}

	async exec() {
		this.logger.info("closing TypeORM database connection...");
		await this.typeORMClient.destroy();
		this.logger.info("Successfully closed TypeORM database connection");

		return true;
	}
}
