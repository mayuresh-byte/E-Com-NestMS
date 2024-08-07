import { HttpService } from '@nestjs/axios';
import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('order')
export class OrderController {
    constructor(@Inject('ORDER_SERVICE') private readonly productService: ClientProxy) {}
}
