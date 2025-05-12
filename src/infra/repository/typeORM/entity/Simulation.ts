import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Simulation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@ManyToOne(() => Student, { nullable: false })
	@JoinColumn({ name: "student_id", referencedColumnName: "id" })
	studentId!: string;

	@Column("decimal", { precision: 15, scale: 2, nullable: false })
	totalValue!: number;

	@Column({ nullable: false })
	installmentsQuantity!: number;

	@Column("decimal", { precision: 5, scale: 2, nullable: false })
	interestPerMonth!: number;

	@Column("decimal", { precision: 15, scale: 2, nullable: false })
	monthlyInstallmentValue!: number;
}
