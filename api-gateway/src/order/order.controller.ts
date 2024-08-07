import { HttpService } from '@nestjs/axios';
import { Body, Controller, Get, Inject, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/createOrder.dto';
import { RolesGuard } from 'src/product/roles.guard';
import { Roles } from 'src/product/roles.decorator';

@Controller('order')
export class OrderController {
    constructor(@Inject('ORDER_SERVICE') private readonly productService: ClientProxy) {}

    @Post()
    @Roles('customer')
    @UseGuards(RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async createOrder(@Body() createOrderData: CreateOrderDto, @Request() req) {
        try {
            const products = createOrderData.products;
            const userInfo = req.user;
            return this.productService.send({cmd: 'create_order'}, {products, userInfo});
        } catch (error) {
            return error;
        }
    }
}
