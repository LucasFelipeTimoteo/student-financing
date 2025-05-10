import type { DataSource } from "typeorm";
import type { logger } from "../../../../../application/logger/logger";
import type { GracefullShutdownHandlerStrategyType } from "../types/gracefullShutdownHandlerStrategy";
import { GracefullShutdownTypeORMStrategy } from "./typeorm/gracefullShutdownTypeORMStrategy";

type gracefullShutdownHandlerClientSelectorClientNames = "typeorm"; // add new client names for new databases
type gracefullShutdownHandlerClientSelectorClients = DataSource

export const gracefullShutdownHandlerClientSelector = async (
  clientName: gracefullShutdownHandlerClientSelectorClientNames,
  client: gracefullShutdownHandlerClientSelectorClients,
  logger: logger
) => {
  let strategyHandler: GracefullShutdownHandlerStrategyType;
  // To add new databases, just create a new case with its own strategy
  switch (clientName) {
    case "typeorm": {
      strategyHandler = new GracefullShutdownTypeORMStrategy(
        client as DataSource,
        logger
      );
      break;
    }
  }

  return strategyHandler;
};