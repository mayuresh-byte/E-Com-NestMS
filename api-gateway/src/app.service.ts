import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy) {}

  async test() {
    return this.authService.send({cmd: 'test'}, {});
  }
}
