//Tabla de muchos a muchos 1 usuario puede tener muchos usuarios y muchos roles

import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { RolesEntity } from "./group.roles.entity";

//pueden pertenecer a varios usuarios
@Entity({name: 'tblUsersRoles'})
export class UsersRolesEntity {
    @PrimaryGeneratedColumn({
        name: 'roles_intId',
        type: 'int',
    })
    usersRoles_intId: number;

    @ManyToOne(
        () => UserEntity,
        ( user ) => user.user_UsersRoles,
    )
    usersRoles_User: UserEntity;

    @ManyToOne(
        () => RolesEntity,
        (roles) => roles.roles_UsersRoles 
    )
    usersRoles_Roles: RolesEntity;
}