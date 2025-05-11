import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "students" })
export class Student {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ nullable: false, length: 100 })
	@Check('LENGTH("firstName") >= 2')
	firstName!: string;

	@Column({ nullable: false, length: 200 })
	@Check('LENGTH("lastName") >= 2')
	lastName!: string;

	@Column({ nullable: false, length: 200, unique: true })
	@Check(`email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'`)
	email!: string;

	@Column({ nullable: false, length: 200 })
	@Check('LENGTH("password") >= 8')
	password!: string;
}
