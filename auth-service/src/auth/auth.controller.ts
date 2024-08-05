import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @MessagePattern({ cmd: 'register' })
    async register(data: any) {
        return this.authService.register(data);
    }

    @MessagePattern({ cmd: 'login' })
    async login(data: any) {
        return this.authService.login(data);
    }
}
