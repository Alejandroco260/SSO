import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({example: 'example@gmail.com', description: 'email for user'})
    @IsString()
    @IsEmail()
    user_strEmail: string;

    @ApiProperty({example: 'Alex0104', description: 'password for user'})
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    @MinLength(1)
    @IsString()
    user_strPassword: string;
}