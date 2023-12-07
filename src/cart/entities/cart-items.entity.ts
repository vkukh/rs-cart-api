import { Entity, Column, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cart } from './carts.entity';

@Entity('cart_items')
export class CartItem {
  @ManyToOne(type => Cart, cart => cart.items, { eager: false })
  @JoinColumn({ name: 'cart_id' })
  cart_id: string;

  @PrimaryColumn('uuid', { name: 'product_id', nullable: false })
  product_id: string;

  @Column('int')
  count: number;
}
