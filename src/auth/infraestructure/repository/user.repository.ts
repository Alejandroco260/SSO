import { IUserEntity } from "src/auth/domain/Users/user.interface.entity";
import { IUserRepository } from "src/auth/domain/Users/user.interface.repository";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { CreateUserDto } from "src/auth/application/dto/user.create.dto";
import { Injectable, Logger } from "@nestjs/common";
import { UpdateUserDTO } from "src/auth/application/dto/user.update.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericResponse } from "src/libs/response/genericResponse";

const log = new Logger();

@Injectable()
export class UserRepository implements IUserRepository{

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}
    
    public async updateUser( updateUser: UpdateUserDTO ): Promise<GenericResponse<IUserEntity>> {
        try {
            const user = await this.userRepository.preload({
                user_intId: updateUser.user_intId,
                ...updateUser
            });
            return new GenericResponse(200, 'User updated successfully', user); 
        } catch (error) {
            return new GenericResponse(500, 'Failed to updateUser user', null); 
        }
    } 

    public async createUser(createUserDto: CreateUserDto): Promise<GenericResponse<IUserEntity>> {
        try {
            const user = this.userRepository.create( createUserDto );
            const saveUser = await this.userRepository.save( user );
            return new GenericResponse(200, 'User created successfully', saveUser);
        } catch (error) {
            log.error(error);
            return new GenericResponse(500, 'Failed to createUser user', null); 
        }
    }

    public async getAllUsers(): Promise<GenericResponse<IUserEntity[]>> {
        try {

            const users = await this.userRepository.find(); 
            return new GenericResponse(200, 'Users', users);
            
        } catch (error) {
            console.log(error)
            return new GenericResponse(500, 'Failed to getAllUsers user', null); 
        }
    }
    
    public async getUserForPhone( phone: number ): Promise<GenericResponse<IUserEntity>> {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
            .where(`user.user_intPhone = ${phone}`)
            .getOne(); 

            return new GenericResponse(200, 'Users', user);
        } catch (error) {
            log.error(error);
            return new GenericResponse(200, 'Failed to getUserForPhone user', null);
        }
    }

    public async getOneUser( term: number ): Promise<GenericResponse<IUserEntity>> {
        try {

            const user = await this.userRepository.createQueryBuilder('user')
            .where(`user.user_intId = ${term}`)
            .getOne(); 

            return new GenericResponse(200, 'Users', user);
        } catch (error) {
            console.log(error)
            return new GenericResponse(200, 'Failed to getOneUser user', null);
        }
    }

    public async getUserForEmail( email: string): Promise<GenericResponse<IUserEntity>> {
        try {
            const user = await this.userRepository.createQueryBuilder('user')
            .where(`user.user_strEmail = ${email}`)
            .getOne(); 
            return new GenericResponse(200, 'Users', user);
        } catch (error) {
            log.error(error);
            return new GenericResponse(200, 'Failed to getUserForEmail user', null);
        }
    }

}