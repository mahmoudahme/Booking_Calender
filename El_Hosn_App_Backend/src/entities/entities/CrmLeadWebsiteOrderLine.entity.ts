import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crm_lead_website_order_line', { schema: 'public' })
export class CrmLeadWebsiteOrderLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  lead_id!: number;

  @Column({ nullable: true })
  external_line_id!: number | null;

  @Column({ nullable: true })
  external_product_id!: number | null;

  @Column({ nullable: true })
  variation_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  product_name!: string | null;

  @Column({ nullable: true })
  sku!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  quantity!: number | null;

  @Column({ nullable: true })
  subtotal!: number | null;

  @Column({ nullable: true })
  tax!: number | null;

  @Column({ nullable: true })
  total!: number | null;

}
