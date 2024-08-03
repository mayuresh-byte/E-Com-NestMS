import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('USER_SERVICE') private readonly userService: ClientProxy) {}

  async test() {
    this.userService.send({cmd: 'test'}, {});
  }
}
