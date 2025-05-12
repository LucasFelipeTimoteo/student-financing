import type { NextFunction, Response } from "express";
import type { StudentController } from "../../../../../adapters/controllers/student/studentController";
import { ApiValidationError } from "../../../../../application/errors/apiValidation/apiValidationError";
import type { partialStudent } from "../../../../../application/students/students";
import { StudentEmail } from "../../../../../domain/value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../../../../domain/value objects/student/studentFirstName/studentFirstName";
import { StudentLastName } from "../../../../../domain/value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../../../../domain/value objects/student/studentPassword/studentPassword";
import type {
	editStudentExpressRequest,
	getStudentExpressRequest,
} from "./types/customStudentRequest";

export class StudentRouteHandler {
	constructor(private studentController: StudentController) {}

	async getStudent(
		this: StudentRouteHandler,
		req: getStudentExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			const { accessToken } = req.body;
			const getUserResponse =
				await this.studentController.getStudent(accessToken);

			return res.status(getUserResponse.status).json(getUserResponse.body);
		} catch (error) {
			next(error);
		}
	}

	async editStudent(
		this: StudentRouteHandler,
		req: editStudentExpressRequest,
		res: Response,
		next: NextFunction,
	) {
		try {
			if (!("newData" in req.body) || typeof req.body.newData !== "object") {
				throw new ApiValidationError(
					"Student data shold be inside a 'newData' object",
					400,
				);
			}

			const {
				accessToken,
				newData: { firstName, lastName, email, password },
			} = req.body;

			const validatedUserEdition: partialStudent = {
				...(typeof firstName === "string" && {
					firstName: new StudentFirstName(firstName),
				}),

				...(typeof lastName === "string" && {
					lastName: new StudentLastName(lastName),
				}),

				...(typeof email === "string" && {
					email: new StudentEmail(email),
				}),

				...(typeof password === "string" && {
					password: new StudentPassword(password),
				}),
			};

			const editStudentResponse = await this.studentController.editStudent(
				validatedUserEdition,
				accessToken,
			);

			return res
				.status(editStudentResponse.status)
				.json(editStudentResponse.body);
		} catch (error) {
			next(error);
		}
	}
}
