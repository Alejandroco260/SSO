import { Repository } from "typeorm";
import { RolesEntity } from "../entity/group.roles.entity";
import { RolesEnum } from "src/libs/enums";
import { IRolesRepository, IUserRolesRepository } from "src/auth/domain/Roles/user.roles.repository.interface";
import { HttpException, HttpStatus, Inject, Injectable, Logger } from "@nestjs/common";
import { IRoles, IUserRoles } from "src/auth/domain/Roles/user.roles.entiti.interface";
import { UsersRolesEntity } from "../entity/users.roles.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericResponse } from "src/libs/response/genericResponse";

const log = new Logger();

@Injectable()
export class RolesRepository implements IRolesRepository{

    constructor(
        @InjectRepository(RolesEntity)
        private readonly rolesRepository: Repository<RolesEntity>
    ){}

    public async getRoles(): Promise<GenericResponse<IRoles[]>> {
        try{
            const roles = await this.rolesRepository.find();
            return new GenericResponse(200, 'Roles', roles);
        }catch (error){
            log.error(error);
            return new GenericResponse(500, 'Failed to getRoles', null);
        }
    }
}

@Injectable()
export class UserRolesRepository implements IUserRolesRepository{

    constructor(
        @InjectRepository(UsersRolesEntity)
        private readonly userRolesRepository: Repository<UsersRolesEntity>
    ){}
    
    public async createUserRoles(userRoles: IUserRoles): Promise<GenericResponse<IUserRoles> >{
        try {
            const userRol = await this.userRolesRepository.create(userRoles);

            const saveRol = await this.userRolesRepository.save(userRol);

            return new GenericResponse(200, 'Roles', saveRol);
        } catch (error) {
            log.error(error);
            return new GenericResponse(500, 'Failed to createUserRoles', null);
        }
    }
}