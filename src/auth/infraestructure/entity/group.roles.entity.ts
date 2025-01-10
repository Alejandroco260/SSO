//La informacion de estas tablas se debe de llenar manualmente con la informacion de
//un excel existente en la documentacion

import { IGroupRoles, IRoles } from "src/auth/domain/Roles/user.roles.entiti.interface";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { UsersRolesEntity } from "./users.roles.entity";
import { RolesEnum } from "src/libs/enums";

@Entity({name: 'tblGroupRoles'})
export class GroupRolesEntity implements IGroupRoles{

    @PrimaryGeneratedColumn({
        name: 'groupRoles_intId',
        type: 'bigint',
    })
    groupRoles_intId: number;

    @Column({
        name: 'groupRoles_strDescription',
        nullable: false,
        type: 'text'
    })
    groupRoles_strDescription: string;

    @Column({
        name: 'groupRoles_strRoutes',
        nullable: false,
        type: 'text'
    })
    groupRoles_strRoutes: string;

    @ManyToOne(
        () => RolesEntity,
        ( roles ) => roles.roles_GroupRoles,
    )
    groupRoles_Roles: IRoles;

    @Column({name: 'groupRoles_dtmUpdateUser', nullable: true})
    groupRoles_dtmUpdateUser: Date;

    @CreateDateColumn({name: 'groupRoles_dtmCreateUser', nullable: true})
    groupRoles_dtmCreateUser: Date;

    @DeleteDateColumn({name: 'groupRoles_dtmDeleteUser', nullable: true})
    groupRoles_dtmDeleteUser: Date;
}


@Entity({name: 'tblRoles'})
export class RolesEntity implements IRoles {
    
    @PrimaryGeneratedColumn({
        name: 'roles_intId',
        type: 'int',
    })
    roles_intId: number;
    
    @Column({
        name: 'roles_srtName',
        nullable: true,
        type: 'enum',
        default: RolesEnum.DEFAULT,
        enum: RolesEnum
    })
    roles_srtName: RolesEnum;

    @Column({
        name: 'roles_intScope',
        type: 'int',
        nullable: false,
    })
    roles_intScope: number;

    @Column({
        name: 'roles_strDescription',
        nullable: false,
        type: 'text'
    })
    roles_strDescription: string;

    @OneToMany(
        () => GroupRolesEntity,
        (gr) => gr.groupRoles_Roles 
    )
    roles_GroupRoles: GroupRolesEntity;

    @OneToMany(
        () => UsersRolesEntity,
        (ur) => ur.usersRoles_Roles 
    )
    roles_UsersRoles: UsersRolesEntity;
    
    @Column({name: 'roles_dtmUpdateUser', nullable: true})
    roles_dtmUpdateUser: Date;

    @CreateDateColumn({name: 'roles_dtmCreateUser', nullable: true})
    roles_dtmCreateUser: Date;
    
    @DeleteDateColumn({name: 'roles_dtmDeleteUser', nullable: true})
    roles_dtmDeleteUser: Date;
}



