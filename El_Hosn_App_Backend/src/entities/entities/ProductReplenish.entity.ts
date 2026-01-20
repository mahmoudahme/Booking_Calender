import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_replenish', { schema: 'public' })
export class ProductReplenish {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  route_id!: number | null;

  @Column()
  product_id!: number;

  @Column()
  product_tmpl_id!: number;

  @Column()
  product_uom_id!: number;

  @Column()
  warehouse_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  product_has_variants!: boolean;

  @Column()
  date_planned!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  quantity!: number;

  @Column({ nullable: true })
  supplier_id!: number | null;

}
