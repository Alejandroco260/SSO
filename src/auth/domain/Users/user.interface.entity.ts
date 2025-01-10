import { TokenEntity } from "src/auth/infraestructure/entity/token.entity";
import { RolesEnum, SexEnum } from "src/libs/enums/index";

export interface IUserEntity {
    user_intId: number;
    user_strName: string;
    user_intAge: number;
    user_intPhone: number;
    user_enmSex: SexEnum;
    user_enmRol: RolesEnum[];
    user_strUserId: string;
    user_strEmail: string;
    user_strPassword: string;
    user_imgFace: string;
    user_isActive: boolean;
    user_Token: TokenEntity;
}