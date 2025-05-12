import request from "supertest";
import { Appfactory } from "../../src/infra/http/express/app/utils/factories/appFactory"
import { ExpressEntryPoint } from "../../src/infra/http/express/entrypoint"
import { TypeORMClient } from "../../src/infra/repository/typeORM/service/typeORMClient"
import { pinoLogger } from "../../src/infra/logger/pino/pinoLogger"

const typeORMClient = new TypeORMClient(pinoLogger).initialize();
const application = Appfactory(pinoLogger, typeORMClient);
const app = new ExpressEntryPoint(application, pinoLogger, typeORMClient).configApp()

// TODO: CRIAR SEEDS
// TODO O DATABASE DE TESTE USADO DEVE SER DIFERENTE DO DATABASE PRINCIPAL
// TODO: TESTES DE TODOS OS ENDPOINTS

describe("healthcheck", () => {
	describe("GET /health", () => {
		it("", async () => {
			await request(app)
				.get("/health")
				.expect(200)
				.expect("OK")
		})
	})
})

// describe("Auth Endpoints", () => {

// 	describe("POST /api/register", () => {
// 		//HAPPY PATH
// 		it("should register a new user successfully", async () => {
// 			await request(app)
// 				.post("/api/register")
// 				.send({
// 					firstName: "John",
// 					lastName: "Doe",
// 					email: "Example_For_Test@email.com",
// 					password: "12345678"
// 				})
// 				.expect(201)
// 				.expect(res => {
// 					expect(res.body).toHaveProperty("accessToken")
// 					expect(res.body).toHaveProperty("refreshToken")
// 				});
// 		});
// 		// UNHAPPY PATH

// 		// TODO:
// 	});
// });