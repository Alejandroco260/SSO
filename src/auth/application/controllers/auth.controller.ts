import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('Auth')
@Controller('Auth')
export class UserController{
}