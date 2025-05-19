import type { Request } from "express";

export interface getSimumationsExpressRequest extends Request {}

export interface createSimulationExpressRequest {
	body: {
		accessToken: string;
		totalValue: number;
		installmentsQuantity: number;
		interestPerMonth: number;
	};
}
