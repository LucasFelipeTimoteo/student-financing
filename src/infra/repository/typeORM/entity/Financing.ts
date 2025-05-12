import {
	AfterLoad,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Student } from "./Student";

@Entity()
export class Financing {
	@PrimaryGeneratedColumn("uuid")
	id!: number;

	@ManyToOne(() => Student)
	@JoinColumn({ name: "student_id", referencedColumnName: "id" })
	student_id!: Student;

	@Column("decimal", { precision: 15, scale: 2 })
	totalValue!: number;

	@Column()
	installmentsQuantity!: number;

	@Column("decimal", { precision: 5, scale: 2 })
	interestPerMonth!: number;

	@Column("decimal", { precision: 15, scale: 2, nullable: true })
	monthlyInstallmentValue!: number;

	@AfterLoad()
	calculateMonthlyInstallment() {
		const monthlyInterestRate = this.interestPerMonth / 100;
		const totalAmount = this.totalValue;
		const numberOfInstallments = this.installmentsQuantity;

		if (monthlyInterestRate > 0) {
			this.monthlyInstallmentValue =
				(totalAmount * monthlyInterestRate) /
				(1 - (1 + monthlyInterestRate) ** -numberOfInstallments);
		} else {
			this.monthlyInstallmentValue = totalAmount / numberOfInstallments;
		}
	}
}
