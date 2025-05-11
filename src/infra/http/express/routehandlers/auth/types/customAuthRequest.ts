export interface AccessTokenRefreshExpressRequest {
	body: {
		expiredToken: string;
		refreshToken: string;
	};
}

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
