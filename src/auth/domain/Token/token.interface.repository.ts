import { CreateTokenDTO } from "src/auth/application/dto/token.create.dto";
import { IUserEntity } from "../Users/user.interface.entity";
import { ITokenEntity } from "./token.interface.entity";
import { GenericResponse } from "src/libs/response/genericResponse";

export interface ITokenRepository {
    getUserForToken( token: string ): Promise<GenericResponse<IUserEntity>>;
    createToken( CreateTokenDTO: CreateTokenDTO ):  Promise<GenericResponse<ITokenEntity>>;
}