import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { Cart as CartEntity, CartItem as CartItemEntity } from '../entities';
import { Cart, CartItem } from '../models';

@Injectable()
export class CartService {
  private userCarts: Record<string, Cart> = {};

  constructor(
    // @InjectRepository(CartRepository)
    // private readonly cartRepository: CartRepository
    @InjectRepository(CartEntity)
    private cartRepository: Repository<Cart>,
    @InjectRepository(CartItemEntity)
    private cartItemRepository: Repository<CartItemEntity>
  ) {}


  public async findByUserId(userId: string): Promise<Cart | null> {
    const data = await this.cartRepository.findOne({
      where: { userId },
      relations: ['items']
    });

    return data;

  }

  public async createByUserId(userId: string) {
    const newCart = new CartEntity();
    newCart.id = v4(v4());
    newCart.userId = userId;
    newCart.status = 'OPEN';
    newCart.created_at = new Date();
    newCart.updated_at = new Date();

    return this.cartRepository.save(newCart);
  }

  public async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  public async updateByUserId(userId: string, items: CartItem[]): Promise<Cart> {
    const { id } = await this.findOrCreateByUserId(userId);
  
    const createdCartItems = [];
    console.log(items)
    for(const item of items) {
      const newCartItem = new CartItemEntity();
      newCartItem.cart_id = id;
      newCartItem.product_id = item.productId;
      newCartItem.count = item.count;
      
      const savedItem = await this.cartItemRepository.save(newCartItem);
      
      createdCartItems.push(savedItem);
    }
  
    const updatedCart = new CartEntity();
    updatedCart.id = id;
    updatedCart.items = createdCartItems;
    
    return this.cartRepository.save(updatedCart);
  }

  removeByUserId(userId): void {
    this.userCarts[ userId ] = null;
  }

}
