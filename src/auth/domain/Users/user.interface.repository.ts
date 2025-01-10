import { CreateUserDto } from "src/auth/application/dto/user.create.dto";
import { IUserEntity } from "./user.interface.entity";
import { UpdateUserDTO } from "src/auth/application/dto/user.update.dto";
import { GenericResponse } from "src/libs/response/genericResponse";

export interface IUserRepository {
    getAllUsers(): Promise<GenericResponse<IUserEntity[]>>;
    getOneUser( term: number ): Promise<GenericResponse<IUserEntity>>;
    getUserForPhone( phone: number ): Promise<GenericResponse<IUserEntity>>;
    getUserForEmail( email: string): Promise<GenericResponse<IUserEntity>>;
    updateUser( updateUser: UpdateUserDTO ): Promise<GenericResponse<IUserEntity>>
    createUser( createUserDto: CreateUserDto ): Promise<GenericResponse<IUserEntity>>;
}