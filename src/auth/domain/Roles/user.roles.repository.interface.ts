import { RolesEnum } from "src/libs/enums";
import { IRoles, IUserRoles } from "./user.roles.entiti.interface";
import { GenericResponse } from "src/libs/response/genericResponse";

export interface IRolesRepository{
    getRoles(): Promise<GenericResponse<IRoles[]>>;
}

export interface IUserRolesRepository{
    createUserRoles( userRoles: IUserRoles ): Promise<GenericResponse<IUserRoles>>;
}