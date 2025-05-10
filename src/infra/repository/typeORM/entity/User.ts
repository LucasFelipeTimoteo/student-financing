import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ nullable: false, length: 100 })
    firstName!: string

    @Column({ nullable: false, length: 200 })
    lastName!: string

    @Column({
        type: "int",
        nullable: false,
        comment: "Valor deve estar entre 16 e 200"
    })
    @Check(`"age" >= 16 AND "age" <= 200`)
    age!: number
}
