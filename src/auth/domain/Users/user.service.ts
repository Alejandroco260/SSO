import { Inject, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from "@nestjs/common";
import { IUserEntity } from "./user.interface.entity";
import { InjectDataSource } from "@nestjs/typeorm";
import { UserRepository } from "../../infraestructure/repository/user.repository";
import { IUserRepository } from "./user.interface.repository";
import { CreateUserDto } from "../../application/dto/user.create.dto";
import { LoginDto } from "../../application/dto/login.dto";
import { TokenRepository } from "src/auth/infraestructure/repository/token.repository";
import { ITokenRepository } from "../Token/token.interface.repository";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "src/auth/application/dto/token.strategy.dto";
import { CreateTokenDTO } from "src/auth/application/dto/token.create.dto";
import { RolesEnum } from "src/libs/enums";
import { RolesRepository, UserRolesRepository } from "src/auth/infraestructure/repository/user.roles.repository";
import { IRolesRepository, IUserRolesRepository } from "../Roles/user.roles.repository.interface";
import { IRoles, IUserRoles } from "../Roles/user.roles.entiti.interface";
import { DataSource, QueryRunner } from "typeorm";
import { UpdateUserDTO } from "src/auth/application/dto/user.update.dto";
import { GenericResponse } from "src/libs/response/genericResponse";

const log = new Logger('UserService');

@Injectable()
export class UserService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectDataSource()
        private readonly dataSource: DataSource,
        // ! INJECCION DE REPOSITORIOS
        @Inject( UserRepository )
        private readonly userRepository: IUserRepository,
        @Inject( TokenRepository )
        private readonly tokenRepository: ITokenRepository,
        @Inject(RolesRepository)
        private readonly rolesRepository: IRolesRepository,
        @Inject(UserRolesRepository)
        private readonly UserRolesRepository: IUserRolesRepository,
        // ? INJECCION DE SERVICIOS
    ){}

    public async getAllUsers(): Promise<GenericResponse<IUserEntity[]>> {
        try {
            const user = this.userRepository.getAllUsers();
            return user;
        } catch (error) {
            return error;
        }
    }

    public async getOneUser( term: number ): Promise<GenericResponse<IUserEntity>> {
        try {
            const user = this.userRepository.getOneUser( term );
            return user;
        } catch (error) {
            return error;
        }
    }

    public async createUser( createUserDto: CreateUserDto, isAdmin = false) {
        // ? SE DEBE DE HACER UNA AUTENTICACION MULTIFACTOR EN EL NUMERO DE CELULAR
        const isExistUser = await this.userRepository.getUserForPhone( createUserDto.user_intPhone );
        
        if( isExistUser ){
            // ? Se valida por el telefono si el usuario ya existe actualmente en el sistema se actualiza
            // this.updateUser( {...isExistUser, user_dtmDeleted: null} );
            return new GenericResponse(409, 'The user already exists.', null)
        }
        const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
        try {
            const {user_strPassword, ...userData} = createUserDto;
    
            const user: CreateUserDto = {
                ...userData,
                user_strPassword: bcrypt.hashSync(user_strPassword, 10),
            }
    
            if(isAdmin) user.user_enmRol.push(RolesEnum.USER);

            await queryRunner.startTransaction();
    
            const createUser = await this.userRepository.createUser( user );

            if(createUser.status !== 200) throw new InternalServerErrorException("Failet to create user");

            const iuser = createUser.response;
    
            this.createUserMain( iuser );
    
            delete iuser.user_strPassword;
    
            const token = this.getJwtToken( { id: iuser.user_intId } );
    
            const createToken: CreateTokenDTO = {
                token_strToken: token,
                token_User: iuser
            };
    
            const getToken = await this.tokenRepository.createToken( createToken );
    
            // this.sendEmailsService.main();//TODO:DESCOMENTAR PARA ENVIAR EMAILS
    
            await queryRunner.commitTransaction();
            return new GenericResponse(500, 'Failed to createUser', null)
        } catch (error) {
            await queryRunner.rollbackTransaction();
            return new GenericResponse(500, 'Failed to createUser', null)
        } finally {
            await queryRunner.release();
        }
    }

    public async loginUser( loginUserDto: LoginDto, request: any ) {
        try {
            const {user_strPassword, user_strEmail} = loginUserDto

            const user = await this.userRepository.getUserForEmail( user_strEmail );

            const iuser = user.response;

            if (!iuser) throw new UnauthorizedException(`Credentials are not valid (email)`)

            if(!bcrypt.compareSync(user_strPassword, iuser.user_strPassword)) 
            throw new UnauthorizedException(`Credentials are not valid (password)`)

            const token = this.getJwtToken({id: iuser.user_intId})

            const createToken: CreateTokenDTO = {
                token_User: iuser,
                token_strToken: token
            }

            const rel = await this.tokenRepository.createToken(createToken);

            request.headers.autorization = token;

            console.log(request.headers);

            return {
                ...iuser,
                token: token
            }
        } catch (error) {
            log.error(error)
        }
    }

    public async updateUser( updateUser: UpdateUserDTO ){
        try {
            const user = await this.userRepository.updateUser( updateUser );
            return user;
        } catch (error) {
            log.error(error);
        }
    }

    // LOS METHODOS PRIVADOS LOS DEFINO HASTA ABAJO

    private async createUserMain( user: IUserEntity ){
        try {
            const getRoles = await this.rolesRepository.getRoles();

            let igetRoles = getRoles.response
    
            igetRoles = igetRoles.filter( roles => user.user_enmRol.includes(roles.roles_srtName));
    
            igetRoles.forEach( rol => {
                const userRoles: IUserRoles = {
                    usersRoles_Roles: rol,
                    usersRoles_User: user
                }
    
                this.UserRolesRepository.createUserRoles(userRoles);
            });
        } catch (error) {
            log.error(error);
        }
    }

    private getJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign(payload)
        return token
    }
}