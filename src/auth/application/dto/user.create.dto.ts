import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, Min, MinLength } from "class-validator";
import { getOptionsFromEnum, RolesEnum, SexEnum } from "src/libs/enums";

export class CreateUserDto{

    @ApiProperty({example: 'jonh doe', description: 'fullName for user'})
    @IsString()
    @IsNotEmpty()
    user_strName: string;

    // @ApiProperty({example: 20, description: 'age of user'})
    @IsNumber()
    @Min(1)
    @IsOptional()
    user_intAge: number;

    // @ApiProperty({example: 'MAN', description: 'sex of user'})
    @IsEnum(SexEnum, {message: `Opciones validas: ${getOptionsFromEnum(SexEnum)}`})
    @IsOptional()
    user_enmSex: SexEnum;

    // @ApiProperty({example: 'DEFAULT', description: 'rol of user'})
    // @IsEnum(RolesEnum, {message: `Opciones validas: ${getOptionsFromEnum(RolesEnum)}`})
    // @IsOptional()
    user_enmRol: RolesEnum[];

    @IsNumber()
    @ApiProperty({example: 4171400040, description: 'Phone for user'})
    // @IsOptional()
    user_intPhone: number;

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
    

    // @ApiProperty({example: 'Alex0104', description: 'photo for user'})
    @Matches(
        /^(\/[a-zA-Z0-9\-_\.]+)+\/?$/, {
            message: 'The path must start with a slash and can contain letters, numbers, hyphens, underscores, and dots.'
    })
    @MinLength(1)
    @IsString()
    @IsOptional()
    user_imgFace: string;
}