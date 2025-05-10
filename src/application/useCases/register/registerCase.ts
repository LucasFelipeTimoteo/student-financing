import { StudentRepositoryTypeORM } from "../../../infra/repository/studentRepositoryTypeORM";

export class RegisterCase {
	async register() {
		const repository = new StudentRepositoryTypeORM();
		const user = repository.register("", "");

		if (!user) {
			return null;
		}

		return {
			accessToken: "register-example-access-token",
			refreshToken: "eregister-xample-refresh-token",
		};
	}
}
