import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_optional_rel', { schema: 'public' })
export class ProductOptionalRel {
  @PrimaryColumn()
  src_id!: number;

  @PrimaryColumn()
  dest_id!: number;

}
