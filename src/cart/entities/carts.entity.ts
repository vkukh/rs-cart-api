import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { CartItem } from './cart-items.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId: string;

  @Column('date')
  created_at: Date;

  @Column('date')
  updated_at: Date;

  @Column('enum', { enum: ['OPEN', 'ORDERED'] })
  status: string;

  @OneToMany(type => CartItem, cart_item => cart_item.cart_id, { eager: true })
  items: CartItem[];
}
