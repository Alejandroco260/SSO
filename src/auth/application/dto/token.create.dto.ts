import { IUserEntity } from "src/auth/domain/Users/user.interface.entity";

export class CreateTokenDTO {
    token_strToken: string;
    token_User: IUserEntity;
}