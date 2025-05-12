import type { NextFunction, Response } from "express";
import type { StudentController } from "../../../../../adapters/controllers/student/studentController";
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
			const { accessToken, newData } = req.body;

			const editStudentResponse = await this.studentController.editStudent(
				newData,
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
