import { StudentEmail } from "../../value objects/student/studentEmail/studentEmail";
import { StudentFirstName } from "../../value objects/student/studentFirstName/studentFirstName";
import { StudentId } from "../../value objects/student/studentId/studentId";
import { StudentLastName } from "../../value objects/student/studentLastName/studentLastName";
import { StudentPassword } from "../../value objects/student/studentPassword/studentPassword";

export class StudentEntity {
	public readonly id: StudentId;
	public readonly firstName: StudentFirstName;
	public readonly lastName: StudentLastName;
	public readonly email: StudentEmail;
	public readonly password: StudentPassword;

	constructor(user: {
		id: string;
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	}) {
		this.id = new StudentId(user.id);
		this.firstName = new StudentFirstName(user.firstName);
		this.lastName = new StudentLastName(user.lastName);
		this.email = new StudentEmail(user.email);
		this.password = new StudentPassword(user.password);
	}
}
