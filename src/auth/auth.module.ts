import { Module } from "@nestjs/common";
import { UserService } from "./domain/Users/user.service";
import { UserRepository } from "./infraestructure/repository/user.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "./infraestructure/entity/user.entity";
import { UserController } from "./application/controllers/user.controller";
import { TokenEntity } from "./infraestructure/entity/token.entity";
import { TokenRepository } from "./infraestructure/repository/token.repository";
import { JWTStrategy } from "./strategies/user.jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { LibsModule } from "src/libs/libs.module";
import { GroupRolesEntity, RolesEntity} from "./infraestructure/entity/group.roles.entity";
import { UsersRolesEntity } from "./infraestructure/entity/users.roles.entity";
import { RolesRepository, UserRolesRepository } from "./infraestructure/repository/user.roles.repository";

@Module({
    controllers:[UserController, UserController],
    providers: [UserService, UserRepository, TokenRepository, RolesRepository, UserRolesRepository, JWTStrategy],
    imports: [
        TypeOrmModule.forFeature([UsersRolesEntity, UserEntity, TokenEntity, GroupRolesEntity, RolesEntity]),
        ConfigModule,
        PassportModule.register({defaultStrategy: 'jwt'}),

        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
              return{
                secret: configService.get('JWT_SECRET'),
                signOptions: {
                  expiresIn: '2h'
                }
              }
            }
          }),
          LibsModule,
    ],
    exports: [TypeOrmModule, UserRepository, JWTStrategy],

})
export class AuthModule{}