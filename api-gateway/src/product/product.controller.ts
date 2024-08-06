import { Body, Controller, Inject, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateProductDto } from './dto/createProduct.dto';

@Controller('product')
export class ProductController {
    constructor(@Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy) {}

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    async create(@Body() createProductData: CreateProductDto) {
        try {
            return this.productService.send({cmd: 'create_product'}, createProductData);
        } catch (error) {
            return {error: error}
        }
    }
}
