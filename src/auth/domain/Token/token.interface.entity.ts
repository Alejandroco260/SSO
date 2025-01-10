import { IUserEntity } from "../Users/user.interface.entity";


export class ITokenEntity {
    token_intId: number;
    token_strToken: string;
    token_User: IUserEntity;
}