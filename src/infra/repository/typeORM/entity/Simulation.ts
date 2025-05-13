import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Simulation {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	// TODO: A TIPAGEM GRADA PELA RELAÇÃO GERA CONFLITO COM A TIPAGEM ESPERADA, QUEBRANDO A INDEPENDÊNCIA DE LIBS EXTERNAS
	// - manter sem relacionamento. Se der tempo, resolver esse problema

	// @ManyToOne(() => Student, { nullable: false })
	// @JoinColumn({ name: "studentId", referencedColumnName: "id" })
	@Column({ nullable: false })
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
