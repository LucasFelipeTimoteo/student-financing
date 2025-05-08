import { pinoLogger } from "../../../../../logger/pino/pinoLogger";
import { ExpressApp } from "../../app";

export const Appfactory = (
  {
    logger = pinoLogger,
    // usersModel = UsersModel(),
    // passwordHasher = new HashPasswordBcrypt(),
    // usersCacheRepository = new UsersCacheRepositoryRedis(cacheClient),
    // usersRepository = new UsersRepositoryMongoose(usersModel, passwordHasher),
    // jwtTokens = new JWTTokensByJsonWebTokenLib(),
    // usersController = new UsersController(
    // 	usersRepository,
    // 	usersCacheRepository,
    // 	logger,
    // 	passwordHasher,
    // 	jwtTokens,
    // 	aes256cbc,
    // ),
    // usersRouteHandler = new usersRouteHandlerExpress(usersController),
    // usersRouter = new UsersRouter(usersRouteHandler),
  },
) => {
  const app = new ExpressApp(logger);

  return app;
};
