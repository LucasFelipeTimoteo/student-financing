export interface getSimumationsExpressRequest {
	body: {
		accessToken: string;
	};
}

export interface createSimulationExpressRequest {
	body: {
		accessToken: string;
		totalValue: number;
		installmentsQuantity: number;
		interestPerMonth: number;
	};
}
