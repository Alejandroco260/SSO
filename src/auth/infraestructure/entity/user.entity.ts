import { IUserEntity } from "src/auth/domain/Users/user.interface.entity";
import { RolesEnum, SexEnum } from "src/libs/enums/index";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TokenEntity } from "./token.entity";
import { UsersRolesEntity } from "./users.roles.entity";

@Entity({ name: 'tblUsers' })
export class UserEntity implements IUserEntity {

    @PrimaryGeneratedColumn({
        name: 'user_intId',
        type: 'bigint',
    })
    user_intId: number;

    @Column({
        name: 'user_strName',
        nullable: false,
        type: 'text'
    })
    user_strName: string;

    @Column({
        name: 'user_intAge',
        nullable: true,
        type: 'int'
    })
    user_intAge: number;

    @Column({
        name: 'user_intPhone',
        nullable: true,
        type: 'bigint'
    })
    user_intPhone: number;

    @Column({
        name: 'user_enmSex',
        nullable: true,
        type: 'enum',
        default: SexEnum.NOTDEFINED,
        enum: SexEnum
    })
    user_enmSex: SexEnum;

    @Column({
        name: 'user_enmRol',
        nullable: true,
        type: 'jsonb',
        default: [RolesEnum.DEFAULT],
    })
    user_enmRol: RolesEnum[];

    @Column({
        name: 'user_strUserId',
        nullable: true,
        type: 'text'
    })
    user_strUserId: string;

    @Column({
        name: 'user_strEmail',
        nullable: true,
        type: 'text'
    })
    user_strEmail: string;

    @Column({
        name: 'user_strPassword',
        nullable: false,
        type: 'text'
    })
    user_strPassword: string;

    @Column({
        name: 'user_imgFace',
        nullable: true,
        type: 'text'
    })
    user_imgFace: string;

    @Column({name: 'user_dtmUpdateUser', nullable: true})
    user_dtmUpdateUser: Date;

    @Column({
        name: 'user_isActive',
        nullable: true,
        type: "bool",
        default: true
    })
    user_isActive: boolean;

    @CreateDateColumn({name: 'user_dtmCreateUser', nullable: true})
    user_dtmCreateUser: Date;

    @DeleteDateColumn({name: 'user_dtmDeleteUser', nullable: true})
    user_dtmDeleteUser: Date;

    @OneToMany(
        () => TokenEntity,
        (token) => token.token_User 
    )
    user_Token: TokenEntity;

    @OneToMany(
        () => UsersRolesEntity,
        (token) => token.usersRoles_User 
    )
    user_UsersRoles: UsersRolesEntity;
}