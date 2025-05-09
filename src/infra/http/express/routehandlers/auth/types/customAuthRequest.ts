export interface AccessTokenRefreshExpressRequest {
  body: {
    expiredToken: string;
    refreshToken: string;
  };
}

export interface LoginExpressRequest {
  body: {
    username: string;
    password: string;
  };
}

export interface RegisterExpressRequest {
  body: {
    username: string;
    password: string;
  };
}