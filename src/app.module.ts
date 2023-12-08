import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart/entities';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      keepConnectionAlive: true,
      autoLoadEntities: true,
      entities: [Cart, CartItem],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
