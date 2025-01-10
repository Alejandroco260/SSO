import { Repository } from "typeorm";
import { TokenEntity } from "../entity/token.entity";
import { ITokenRepository } from "src/auth/domain/Token/token.interface.repository";
import { ITokenEntity } from "src/auth/domain/Token/token.interface.entity";
import { IUserEntity } from "src/auth/domain/Users/user.interface.entity";
import { CreateTokenDTO } from "src/auth/application/dto/token.create.dto";
import { Inject, Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GenericResponse } from "src/libs/response/genericResponse";

const log = new Logger();

@Injectable()
export class TokenRepository implements ITokenRepository {

    constructor(
        @InjectRepository(TokenEntity)
        private readonly tokenRepository: Repository<TokenEntity>
    ) {}

    public async getUserForToken( token: string ): Promise<GenericResponse<IUserEntity>> {
        try{
            let user: IUserEntity;
            const userForToken = await this.tokenRepository.createQueryBuilder('token')
            .where( 'token.token_strToken = :token', {token} ) 
            .leftJoinAndSelect('token.token_User', 'token_User')
            .getOne()//.then((t) => user = t.token_User);

            return new GenericResponse(200, 'User created successfully', userForToken.token_User);
        }catch (error){
            log.error(error);
            return new GenericResponse(500, 'Failed to fetch user for token', null);;
        }
    }
    public async createToken( createTokenDTO: CreateTokenDTO ): Promise<GenericResponse<ITokenEntity>> {
        try {
            const token = await this.tokenRepository.create( createTokenDTO );
            const saveToken = await this.tokenRepository.save(token);
            return new GenericResponse(200, 'Token created successfully', saveToken);   
        } catch (error) {
            log.error(error);
            return new GenericResponse(500, 'Failed to fetch user for token', null);;
        }
    }
    
}