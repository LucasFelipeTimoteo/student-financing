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
	total_value!: number;

	@Column()
	installments_quantity!: number;

	@Column("decimal", { precision: 5, scale: 2 })
	interest_per_month!: number;

	@Column("decimal", { precision: 15, scale: 2, nullable: true })
	monthly_installment_value!: number;

	@AfterLoad()
	calculateMonthlyInstallment() {
		const monthlyInterestRate = this.interest_per_month / 100;
		const totalAmount = this.total_value;
		const numberOfInstallments = this.installments_quantity;

		if (monthlyInterestRate > 0) {
			this.monthly_installment_value =
				(totalAmount * monthlyInterestRate) /
				(1 - (1 + monthlyInterestRate) ** -numberOfInstallments);
		} else {
			this.monthly_installment_value = totalAmount / numberOfInstallments;
		}
	}
}
