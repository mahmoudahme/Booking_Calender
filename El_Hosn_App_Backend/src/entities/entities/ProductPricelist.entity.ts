import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_pricelist', { schema: 'public' })
export class ProductPricelist {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
