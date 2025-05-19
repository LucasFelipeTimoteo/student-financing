import { DataSource } from "typeorm";
import { Student, typeormStudentTableName } from "../../../../src/infra/repository/typeORM/entity/Student";
import { Simulation, typeormSimulationsTableName } from "../../../../src/infra/repository/typeORM/entity/Simulation";

class TypeORMSeeds {
  private uuid = crypto.randomUUID()

  defaultStudent = {
    id: this.uuid,
    firstName: "test-first",
    lastName: "test-last",
    email: "testemail@test.com",
    password: "$2a$10$33yeAbGGDzyiRFWjvYi4BuHpol86u7THimx70sKVOb/giCnqcrepO" // hashed: 12345678
  }
  defaultSimulation = {
    studentId: this.uuid,
    totalValue: 50000.00,
    installmentsQuantity: 24,
    interestPerMonth: 0.01,
    monthlyInstallmentValue: 2353.67
  }

  async generateSeed(typeORMClient: Promise<DataSource>) {
    const client = await typeORMClient;
    const student = new Student()
    const simulation = new Simulation()

    await Promise.all([
      client.manager.clear(Student),
      client.manager.clear(Simulation)
    ])

    student.id = this.defaultStudent.id
    student.firstName = this.defaultStudent.firstName
    student.lastName = this.defaultStudent.lastName
    student.email = this.defaultStudent.email
    student.password = this.defaultStudent.password
    const studentSavePromise = client.manager.save(student)

    simulation.studentId = this.defaultSimulation.studentId;
    simulation.totalValue = this.defaultSimulation.totalValue;
    simulation.installmentsQuantity = this.defaultSimulation.installmentsQuantity;
    simulation.interestPerMonth = this.defaultSimulation.interestPerMonth;
    simulation.monthlyInstallmentValue = this.defaultSimulation.monthlyInstallmentValue
    const simulationSavePromise = client.manager.save(simulation);

    await Promise.all([studentSavePromise, simulationSavePromise])

    return
  }

  async finish(typeORMClient: Promise<DataSource>) {
    const client = await typeORMClient;

    await Promise.all([
      client.createQueryRunner().dropTable(typeormStudentTableName, true),
      client.createQueryRunner().dropTable(typeormSimulationsTableName, true)
    ])

    await client.destroy()
  }
}

export const typeORMSeeds = new TypeORMSeeds()