import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ nullable: false, length: 100 })
	firstName!: string;

	@Column({ nullable: false, length: 200 })
	lastName!: string;

	@Column({ nullable: false, length: 200 })
	@Check(`email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'`)
	email!: string;

	@Column({ nullable: false, length: 200 })
	password!: string;
}
