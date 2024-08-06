import { Body, Controller, Inject, Post, UseGuards, UsePipes, ValidationPipe, Request } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/createProduct.dto';
import { Roles } from './roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('product')
export class ProductController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy) {}

    @Post()
    @Roles('admin')
    @UseGuards(RolesGuard)
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Request() req: any, @Body() createProductData: CreateProductDto) {
        try {
            return this.productService.send({cmd: 'create_product'}, createProductData);
        } catch (error) {
            return {error: error}
        }
    }
}
