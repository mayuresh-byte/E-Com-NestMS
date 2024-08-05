import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

    @Post('register')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async register(@Body() createUserData: CreateUserDto) {
        try {
            return this.authService.send({cmd: 'register'}, createUserData);
        } catch (error) {
            return error;
        }
    }

    @Post('login')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async login(@Body() loginUserDara: LoginUserDto) {
        try {
            return this.authService.send({cmd: 'login'}, loginUserDara);
        } catch (error) {
            return error;
        }
    }
}
