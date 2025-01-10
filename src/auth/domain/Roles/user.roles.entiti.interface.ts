import { RolesEnum } from "src/libs/enums";
import { IUserEntity } from "../Users/user.interface.entity";


export interface IRoles {
    roles_intId: number;	
    roles_srtName: RolesEnum;		
    roles_intScope: number;	
    roles_strDescription: string;
    roles_GroupRoles: IGroupRoles;	
}

export interface IGroupRoles {
    groupRoles_intId: number;
    groupRoles_strDescription: string;	
    groupRoles_strRoutes: string;	
    groupRoles_Roles: IRoles;
}

export interface IUserRoles {
    usersRoles_intId?: number;
    usersRoles_User: IUserEntity;
    usersRoles_Roles: IRoles;
}