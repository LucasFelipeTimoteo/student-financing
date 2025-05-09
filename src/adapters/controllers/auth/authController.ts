import type { logger } from "../../../application/logger/logger";
import {
  type HttpResponse,
  httpResponsePresenter,
} from "../../presenters/http/response/httpResponsePresenter";
// import { LoginCase } from "../../../application/useCases/login/loginCase";

export class AuthController {

  constructor(
    private logger: logger
  ) { }

  async accessTokenRefresh(
    expiredAccessToken: string,
    refreshToken: string,
  ): Promise<HttpResponse<{ newAccessToken: string }>> {
    // const accessTokenRefreshCase = new AccessTokenRefreshCase(
    // 	this.usersCacheRepository,
    // 	this.logger,
    // 	this.JWTTokens,
    // );
    // const newAccessToken = await accessTokenRefreshCase.refresh(
    // 	expiredAccessToken,
    // 	refreshToken,
    // );

    return httpResponsePresenter.ok({ newAccessToken: "example_token" });
  }

  async login(
    username: string,
    password: string,
  ): Promise<HttpResponse<{ accessToken: string; refreshToken: string }>> {
    // const validatedUsername = new UserName(username).username;
    // const validatedPassword = new UserPassword(password).password;

    // const loginCase = new LoginCase(
    //   this.usersRepository,
    //   this.usersCacheRepository,
    //   this.logger,
    //   this.JWTTokens,
    //   this.aes256Cbc,
    // );
    // const usersTokens = await loginCase.login(
    //   validatedUsername,
    //   validatedPassword,
    // );
    return httpResponsePresenter.ok({ accessToken: "teste-token", refreshToken: "teste-token" });
  }

  async register(
    username: string,
    password: string,
  ): Promise<HttpResponse<{ accessToken: string; refreshToken: string }>> {
    // const validatedUsername = new UserName(username).username;
    // const validatedPassword = new UserPassword(password).password;

    // const loginCase = new LoginCase(
    //   this.usersRepository,
    //   this.usersCacheRepository,
    //   this.logger,
    //   this.JWTTokens,
    //   this.aes256Cbc,
    // );
    // const usersTokens = await loginCase.login(
    //   validatedUsername,
    //   validatedPassword,
    // );
    return httpResponsePresenter.ok({ accessToken: "teste-token", refreshToken: "teste-token" });
  }
}