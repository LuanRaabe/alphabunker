import { APIResponse, Login } from "../models";
import { LoginValidator } from "../validators";
import { ExceptionTreatment } from "../utils";
import { LoginDB } from "../client/dao/postgres/login";
import { sign } from "jsonwebtoken";
import { auth } from "../config";

class SearchLoginService {
  private loginValidator = LoginValidator;
  private searchLogin = LoginDB;

  public async execute(login: Login): Promise<APIResponse> {
    try {
      const validLogin = new this.loginValidator(login);

      if (validLogin.errors) {
        throw new Error(`400: ${validLogin.errors}`);
      }

      const findLogin = await this.searchLogin(login.cpf, login.password);

      if (findLogin) {
        const token = sign({ findLogin }, auth.secret, {
          expiresIn: auth.expires,
        });
        return {
          data: {
            account: findLogin.account,
            owner: findLogin.owner,
            token: token,
          },
          messages: [],
        } as APIResponse;
      }
      return {
        data: {},
        messages: ["Conta não encontrada"],
      } as APIResponse;
    } catch (error) {
      throw new ExceptionTreatment(
        error as Error,
        500,
        "an error occurred while searching for the owner"
      );
    }
  }
}

export { SearchLoginService };
