import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string

    @IsPhoneNumber()
    mobile: string
}
