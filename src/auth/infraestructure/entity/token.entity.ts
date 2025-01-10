import { ITokenEntity } from "src/auth/domain/Token/token.interface.entity";
import { IUserEntity } from "src/auth/domain/Users/user.interface.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'tblToken' })
export class TokenEntity implements ITokenEntity{

    @PrimaryGeneratedColumn({
        name: 'token_intId',
        type: 'bigint',
    })
    token_intId: number;

    @Column({
        name: 'token_strToken',
        nullable: false,
        type: 'text'
    })
    token_strToken: string;

    @ManyToOne(
        () => UserEntity,
        ( user ) => user.user_Token,
    )
    token_User: UserEntity;

    @Column({name: 'token_dtmUpdateUser', nullable: true})
    token_dtmUpdateUser: Date;

    @CreateDateColumn({name: 'token_dtmCreateUser', nullable: true})
    token_dtmCreateUser: Date;

    @DeleteDateColumn({name: 'token_dtmDeleteUser', nullable: true})
    token_dtmDeleteUser: Date;
}