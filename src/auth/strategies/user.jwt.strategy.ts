import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "../infraestructure/repository/user.repository";
import { IUserRepository } from "../domain/Users/user.interface.repository";
import { JwtPayload } from "../application/dto/token.strategy.dto";
import { IUserEntity } from "../domain/Users/user.interface.entity";
import { PassportStrategy } from "@nestjs/passport";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject(UserRepository)
        private readonly userRepository: IUserRepository,

        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
        console.log('des de crear JWTStrategy');
    }
    async validate( payload: JwtPayload ): Promise<IUserEntity> {
        const {id} = payload
        const user = await this.userRepository.getOneUser(id);
        const iuser = user.response;

        if(!iuser) throw new UnauthorizedException('token not valid')
        if(!iuser.user_isActive) throw new UnauthorizedException('User is inactive, talk with an admin')
        return iuser;
    }

}