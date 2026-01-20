import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_purchase_order_rel', { schema: 'public' })
export class AccountMovePurchaseOrderRel {
  @PrimaryColumn()
  purchase_order_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
