import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Order } from './order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
    constructor(@Inject('AUTH_SERVICE') private readonly authService: ClientProxy, @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
        @InjectRepository(Order) private orderRepository: Repository<Order>) { }

    async fetchProductPrice(productId: number) {
        const product = await lastValueFrom(this.productService.send({ cmd: 'find_by_id' }, productId));
        return product.result.product.price;
    }

    async createOrder(products: any, userInfo: any) {
        let totalPrice = 0;
        const productsWithPrices = await Promise.all(
            products.map(async (product) => {
                const price = await this.fetchProductPrice(product.productId);
                totalPrice += price * product.quantity;
                return { ...product, price };
            })
        );

        const userId = userInfo.sub;

        const newOrder = await this.orderRepository.save({
            userId: userId,
            products: productsWithPrices,
            totalPrice: totalPrice
        });
        const orderId = newOrder.id;

        await lastValueFrom(this.authService.emit({cmd: 'update_user_orders'}, {userId, orderId}));
        return newOrder;
    }
}
