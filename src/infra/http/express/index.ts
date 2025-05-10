
import { pinoLogger } from "../../logger/pino/pinoLogger";
import { TypeORMClient } from "../../repository/typeORM/service/typeORMClient";
import { Appfactory } from "./app/utils/factories/appFactory";
import { ExpressEntryPoint } from "./entrypoint";

const app = Appfactory()
const typeORMClientInitializer = new TypeORMClient(pinoLogger).initialize()

const expressEntryPoint = new ExpressEntryPoint(
  app,
  pinoLogger,
  typeORMClientInitializer
);

expressEntryPoint.listen();

// AppDataSource.initialize()
// AppDataSource.initialize().then(async () => {

//   console.log("Inserting a new user into the database...")
//   const user = new User()
//   user.firstName = "Timber"
//   user.lastName = "Saw"
//   user.age = 20
//   await AppDataSource.manager.save(user)
//   console.log("Saved a new user with id: " + user.id)

//   console.log("Loading users from the database...")
//   const users = await AppDataSource.manager.find(User)
//   console.log("Loaded users: ", users)

//   console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))
