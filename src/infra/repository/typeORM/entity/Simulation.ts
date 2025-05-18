import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export const simulationsTableName =
	process.env.NODE_ENV === "test" ? "simulations_test" : "simulations";

@Entity({ name: simulationsTableName })
export class Simulation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ nullable: false })
	studentId!: string;

	@Column("decimal", { precision: 15, scale: 2, nullable: false })
	totalValue!: number;

	@Column({ nullable: false })
	installmentsQuantity!: number;

	@Column("decimal", { precision: 5, scale: 3, nullable: false })
	interestPerMonth!: number;

	@Column("decimal", { precision: 15, scale: 2, nullable: false })
	monthlyInstallmentValue!: number;
}
