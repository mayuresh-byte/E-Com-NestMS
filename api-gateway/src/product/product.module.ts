import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'product_queue',
          queueOptions: {
            durable: false,
          },
        },
      }
    ]),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'auth_queue',
          queueOptions: {
            durable: false,
          },
        },
      }
    ]),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [ProductController],
  providers: []
})
export class ProductModule {}
