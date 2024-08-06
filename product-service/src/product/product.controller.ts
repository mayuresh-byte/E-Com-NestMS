import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    @MessagePattern({cmd: 'create_product'})
    async createProduct(data: any) {
        return {msg: data}
    }
}
