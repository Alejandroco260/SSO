import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { META_DATA } from 'src/libs/decorators/role.protected.decorator';
import { TokenRepository } from '../infraestructure/repository/token.repository';
import { IUserEntity } from '../domain/Users/user.interface.entity';
import { GenericResponse } from 'src/libs/response/genericResponse';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(TokenRepository)
    private readonly tokenRepository: TokenRepository
  ){}

  async canActivate(
    context: ExecutionContext,
    
  ) {

    const validRoles: string[] = this.reflector.get(META_DATA, context.getHandler())
    console.log(context.switchToHttp().getRequest())
    if (!validRoles) return true
    if (validRoles.length ===0 ) return true;

    const req = context.switchToHttp().getRequest();
    let token = req.headers.authorization as string;//tambien se puede obtener de rawHeaders
    if( token.includes('Bearer')) token = token.substring(7);
    console.log(token)

    const user = await this.getUser(token);

    console.log('user')
    console.log({user})

    if(!user) throw new BadRequestException(`User not found or inactive`)

    for(const role of user.user_enmRol) {
      if(validRoles.includes(role)) {
        req.headers.user = user.user_intId;
        req.headers.rol = user.user_enmRol;
        return true;
      }
    }
    throw new ForbiddenException(
      `User ${user.user_strName} need a valid role: [${validRoles}]`
    )
  }

  public async getUser( token: string ): Promise<IUserEntity> {
    const user = await this.tokenRepository.getUserForToken(token);
    return user.response;
  }

}
