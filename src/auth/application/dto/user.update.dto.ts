import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./user.create.dto";


export class UpdateUserDTO extends PartialType(CreateUserDto){
    user_intId: number;
    user_isActive: boolean;
    user_dtmDeleted: Date;
}