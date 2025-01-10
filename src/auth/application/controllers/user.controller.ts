import { Body, Controller, ExecutionContext, Get, Inject, Logger, Param, Patch, Post, Req } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "src/auth/domain/Users/user.service";
import { RoutesControllers } from "src/libs/RoutesController";
import { CreateUserDto } from "../dto/user.create.dto";
import { Auth } from "src/libs/decorators/auth.decorator";
import { RolesEnum } from "src/libs/enums";
import { UpdateUserDTO } from "../dto/user.update.dto";

let logger = new Logger('User');

@ApiTags('Users')
@Controller(RoutesControllers.RoutesUser.controller)
export class UserController{
    constructor(
        private readonly userService: UserService,
    ){}
    
    @Get(RoutesControllers.RoutesUser.get)
    @Auth([RolesEnum.ADMIN, RolesEnum.USER, RolesEnum.DEFAULT])
    public GetAllUsers(){
        return this.userService.getAllUsers();
    }

    @Get(RoutesControllers.RoutesUser.getOne)
    public GetOneUser( @Param('id') id: number){
        return this.userService.getOneUser( id );
    }

    @Post(RoutesControllers.RoutesUser.post)
    public CreateUser( @Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Post(RoutesControllers.RoutesUser.post)
    public CreateUserForAdmin( @Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto, true);
    }

    @Patch('update')
    public UpdateUser( @Body() updateUserDTO: UpdateUserDTO){
        return this.userService.updateUser( updateUserDTO );
    }
}