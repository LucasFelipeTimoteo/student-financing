import request from "supertest";
import { Appfactory } from "../../src/infra/http/express/app/utils/factories/appFactory";
import { ExpressEntryPoint } from "../../src/infra/http/express/entrypoint";
import { pinoLogger } from "../../src/infra/logger/pino/pinoLogger";
import { typeormStudentTableName } from "../../src/infra/repository/typeORM/entity/Student";
import { TypeORMClient } from "../../src/infra/repository/typeORM/service/typeORMClient";
import { typeORMSeeds } from './seeds/typeorm/studentsSeeds';
import { JWTJsonWebToken } from "../../src/infra/tokens/jwt/jsonWebTokenLib/JWTJsonWebToken";
import { appEnv } from "../../src/global/utils/env/appEnv/appEnv";
import { typeormSimulationsTableName } from "../../src/infra/repository/typeORM/entity/Simulation";
import { JWTTokensError } from "../../src/application/tokens/jwt/errors/JWTTokensError";

const jwt = new JWTJsonWebToken()
const typeORMClient = new TypeORMClient(pinoLogger).initialize();
const application = Appfactory(pinoLogger, typeORMClient);
const app = new ExpressEntryPoint(application, pinoLogger, typeORMClient).configApp()
const tokenCustomheaderName = "X-Custom-Token"

beforeAll(() => {
	if (typeormStudentTableName !== "students_test") {
		throw Error("test database shoud be used to Students")
	}
	if (typeormSimulationsTableName !== "simulations_test") {
		throw Error("test database shoud be used to simulations")
	}
})

beforeEach(async () => {
	await typeORMSeeds.generateSeed(typeORMClient)
})

afterAll(async () => {
	await typeORMSeeds.finish(typeORMClient)
})

describe("healthcheck", () => {
	describe("GET /health", () => {
		it("Should return status 200 and the response 'OK'", async () => {
			await request(app)
				.get("/health")
				.expect(200)
				.expect("OK")
		})
	})
})

describe("Auth Endpoints", () => {

	const defaultStudent = typeORMSeeds.defaultStudent

	describe("POST /api/register", () => {
		//HAPPY PATH
		it("should register a new user successfully", async () => {
			await request(app)
				.post("/api/register")
				.send({
					firstName: "John",
					lastName: "Doe",
					email: "Example_For_Test_@email.com",
					password: "12345678"
				})
				.expect(201)
				.expect(res => {
					expect(res.body).toHaveProperty("accessToken")
					expect(res.body).toHaveProperty("refreshToken")
				});
		});
		// 		// UNHAPPY PATH

		it("Should throw when insert an user that already exists", async () => {
			await request(app)
				.post("/api/register")
				.send(typeORMSeeds.defaultStudent)
				.expect(400)
				.expect({ message: 'Invalid credentials. Consider using another e-mail' })
		});

		it("Should throw when insert a new user with an email that is already in use", async () => {
			const newUser = { ...defaultStudent }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'Invalid credentials. Consider using another e-mail' })
		});

		it("Should throw when insert a new user with invalid firstName cause it is not defined", async () => {
			const newUser = { ...defaultStudent, firstName: undefined }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'firstName is required, but received: undefined' })
		});

		it("Should throw when insert a new user with invalid firstName cause it is a empty string", async () => {
			const newUser = { ...defaultStudent, firstName: '' }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'firstName is required, but received: ' })
		});

		it("Should throw when insert a new user with invalid firstName cause its legth is less than 2, like 1", async () => {
			const newUser = { ...defaultStudent, firstName: "A" }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'firstName should have a length of at least 2, but received 1 with value: A' })
		});

		it("Should throw when insert a new user with invalid lastName cause it is not defined", async () => {
			const newUser = { ...defaultStudent, lastName: undefined }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'lastName is required, but received: undefined' })
		});

		it("Should throw when insert a new user with invalid lastName cause it is a empty string", async () => {
			const newUser = { ...defaultStudent, lastName: '' }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'lastName is required, but received: ' })
		});

		it("Should throw when insert a new user with invalid lastName cause its legth is less than 2, like 1", async () => {
			const newUser = { ...defaultStudent, lastName: "A" }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'lastName should have a length of at least 2, but received 1 with value: A' })
		});

		it("Should throw when insert a new user with invalid password cause it is not defined", async () => {
			const newUser = { ...defaultStudent, password: undefined }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'password is required, but received: undefined' })
		});

		it("Should throw when insert a new user with invalid password cause it is a empty string", async () => {
			const newUser = { ...defaultStudent, password: '' }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'password is required, but received: ' })
		});

		it("Should throw when insert a new user with invalid password cause its legth is less than 8, like '1234567'", async () => {
			const newUser = { ...defaultStudent, password: "1234567" }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'password should have at least 8 characters, but received 7' })
		});

		it("Should throw when insert a new user with invalid email cause it is not defined", async () => {
			const newUser = { ...defaultStudent, email: undefined }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email is required, but received: undefined' })
		});

		it("Should throw when insert a new user with invalid email cause it is a empty string", async () => {
			const newUser = { ...defaultStudent, email: '' }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email is required, but received: ' })
		});

		it("Should throw when insert a new user with invalid email cause it is not a valid email", async () => {
			const newUser = { ...defaultStudent, email: 'email.com' }

			await request(app)
				.post("/api/register")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email should be valid, but received: email.com' })
		});

	});

	describe("POST /api/login", () => {
		// HAPPY PATH
		it("should login with the [defaultUser] credentials", async () => {
			await request(app)
				.post("/api/login")
				.send({
					email: defaultStudent.email,
					password: "12345678"
				})
				.expect(200)
				.expect(res => {
					expect(res.body).toHaveProperty("accessToken")
					expect(res.body).toHaveProperty("refreshToken")
				});
		})

		//UNHAPPY PATH
		it("Should throw when login with invalid email cause it is not defined", async () => {
			const newUser = { ...defaultStudent, email: undefined }

			await request(app)
				.post("/api/login")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email is required, but received: undefined' })
		});

		it("Should throw when login with invalid email cause it is a empty string", async () => {
			const newUser = { ...defaultStudent, email: '' }

			await request(app)
				.post("/api/login")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email is required, but received: ' })
		});

		it("Should throw when insert a new user with invalid email cause it is not a valid email", async () => {
			const newUser = { ...defaultStudent, email: "invalidmail.com" }

			await request(app)
				.post("/api/login")
				.send(newUser)
				.expect(400)
				.expect({ message: 'email should be valid, but received: invalidmail.com' })
		});

	});

});

describe("Student endpoints", () => {
	const validAccessToken = jwt.genToken({ userId: typeORMSeeds.defaultStudent.id }, appEnv.accessTokenJwtSecret, appEnv.accessTokenTTLMinutes)

	describe("POST /api/me", () => {
		const defaultUserData = { id: typeORMSeeds.defaultStudent.id, firstName: typeORMSeeds.defaultStudent.firstName, lastName: typeORMSeeds.defaultStudent.lastName, email: typeORMSeeds.defaultStudent.email }

		// HAPPY PATH
		it("Should successfully get user data if its token is correct", async () => {
			await request(app)
				.post('/api/me')
				.send({ accessToken: validAccessToken })
				.expect(200)
				.expect((resp) => {
					expect(resp.body).toEqual(defaultUserData)
				})
		})

		//UNHAPPY PATH
		it("Should throw if when accessToken is invalid cause it is not defined", async () => {
			await request(app)
				.post('/api/me')
				.send({})
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is has 0 length", async () => {
			await request(app)
				.post('/api/me')
				.send({ accessToken: "" })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is a string that is not a valid token", async () => {
			await request(app)
				.post('/api/me')
				.send({ accessToken: "testetken12234" })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is expired", async () => {
			const expiredToken = jwt.genToken({ userId: typeORMSeeds.defaultStudent.id }, appEnv.accessTokenJwtSecret, 0)
			await request(app)
				.post('/api/me')
				.send({ accessToken: expiredToken })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})
	});

	describe("PUT /api/me", () => {
		const newData = {
			firstName: "john",
			lastName: "doe",
			email: "newemail@email.com",
			password: "test-password"
		}
		// HAPPY PATH
		it("Should edit user firstName, lastName, email and password successfuly", async () => {
			await request(app)
				.put("/api/me")
				.send({
					accessToken: validAccessToken,
					newData
				})
				.expect(200)
				.expect({ message: `successfully update student ${typeORMSeeds.defaultStudent.id}` })
		})

		// UNHAPPY PATH
		it("Should throw if when accessToken is invalid cause it is not defined", async () => {
			await request(app)
				.post('/api/me')
				.send({
					newData
				})
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is has 0 length", async () => {
			await request(app)
				.post('/api/me')
				.send({ accessToken: "", newData })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is a string that is not a valid token", async () => {
			await request(app)
				.post('/api/me')
				.send({ accessToken: "testetken12234", newData })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is expired", async () => {
			const expiredToken = jwt.genToken({ userId: typeORMSeeds.defaultStudent.id }, appEnv.accessTokenJwtSecret, 0)
			await request(app)
				.post('/api/me')
				.send({ accessToken: expiredToken, newData })
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

	});

});


describe("Simulation endpoints", () => {

	const validAccessToken = jwt.genToken({ userId: typeORMSeeds.defaultStudent.id }, appEnv.accessTokenJwtSecret, appEnv.accessTokenTTLMinutes)

	describe("GET /api/simulations", () => {
		// 	//HAPPY PATH
		it("Should return the corect simulation related with defaultUser", async () => {
			await request(app)
				.get("/api/simulations")
				.set(tokenCustomheaderName, validAccessToken)
				.expect(200)
				.expect((res) => {
					expect(res.body[0]).toMatchObject(typeORMSeeds.defaultSimulation)
				})
		})
		// UNHAPPY PATH
		it("Should throw if when accessToken is invalid cause it is not defined", async () => {
			await request(app)
				.get("/api/simulations")
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is has 0 length", async () => {
			await request(app)
				.get("/api/simulations")
				.set(tokenCustomheaderName, "")
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is a string that is not a valid token", async () => {
			await request(app)
				.get("/api/simulations")
				.set(tokenCustomheaderName, "invalidtoken123")
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})
	});

	describe("POST /api/simulations", () => {
		// 	//HAPPY PATH
		it("Should create a simulation related with defaultUser", async () => {
			await request(app)
				.post("/api/simulations")
				.send({
					accessToken: validAccessToken,
					totalValue: 50000.00,
					installmentsQuantity: 24,
					interestPerMonth: 0.01
				})
				.expect(201)
				.expect((res) => {
					expect(res.body).toMatchObject(typeORMSeeds.defaultSimulation)
				})
		})

		//HAPPY PATH
		it("Should throw if when accessToken is invalid cause it is not defined", async () => {
			await request(app)
				.post("/api/simulations")
				.send({
					totalValue: 50000.00,
					installmentsQuantity: 24,
					interestPerMonth: 0.01
				})
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is has 0 length", async () => {
			await request(app)
				.post("/api/simulations")
				.send({
					accessToken: "",
					totalValue: 50000.00,
					installmentsQuantity: 24,
					interestPerMonth: 0.01
				})
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})

		it("Should throw if when accessToken is invalid cause it is a string that is not a valid token", async () => {
			await request(app)
				.post("/api/simulations")
				.send({
					accessToken: "invalidToken123",
					totalValue: 50000.00,
					installmentsQuantity: 24,
					interestPerMonth: 0.01
				})
				.expect(400)
				.expect(JWTTokensError.invalidTokenResponse)
		})
	});

});