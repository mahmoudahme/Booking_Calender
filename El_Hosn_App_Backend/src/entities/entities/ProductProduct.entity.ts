import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ProductTemplate } from './ProductTemplate.entity';

@Entity('product_product', { schema: 'public' })
export class ProductProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_tmpl_id!: number;

  @ManyToOne(() => ProductTemplate)
  @JoinColumn({ name: 'product_tmpl_id' })
  productTmpl!: ProductTemplate;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  default_code!: string | null;

  @Column({ nullable: true })
  barcode!: string | null;

  @Column({ nullable: true })
  combination_indices!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  standard_price!: any | null;

  @Column({ nullable: true })
  volume!: number | null;

  @Column({ nullable: true })
  weight!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  can_image_variant_1024_be_zoomed!: boolean | null;

  @Column({ nullable: true })
  is_favorite!: boolean | null;

  @Column({ nullable: true })
  is_in_selected_section_of_order!: boolean | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  is_image_fetch_pending!: boolean | null;

  @Column({ type: 'jsonb', nullable: true })
  lot_properties_definition!: any | null;

}
