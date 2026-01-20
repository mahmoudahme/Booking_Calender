import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_tag_rel', { schema: 'public' })
export class SaleOrderTagRel {
  @PrimaryColumn()
  order_id!: number;

  @PrimaryColumn()
  tag_id!: number;

}
