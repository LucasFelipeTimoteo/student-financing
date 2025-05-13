export interface LoginExpressRequest {
	body: {
		email: string;
		password: string;
	};
}

export interface RegisterExpressRequest {
	body: {
		firstName: string;
		lastName: string;
		email: string;
		password: string;
	};
}
