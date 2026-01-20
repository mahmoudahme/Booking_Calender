import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_template_line', { schema: 'public' })
export class SaleOrderTemplateLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sale_order_template_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  product_uom_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  display_type!: string | null;

  @Column({ nullable: true })
  name!: any | null;

  @Column()
  product_uom_qty!: number;

  @Column({ nullable: true })
  is_optional!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
