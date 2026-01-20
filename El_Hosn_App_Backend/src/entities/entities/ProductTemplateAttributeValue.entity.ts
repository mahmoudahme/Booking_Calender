import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_template_attribute_value', { schema: 'public' })
export class ProductTemplateAttributeValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_attribute_value_id!: number;

  @Column()
  attribute_line_id!: number;

  @Column({ nullable: true })
  product_tmpl_id!: number | null;

  @Column({ nullable: true })
  attribute_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  price_extra!: number | null;

  @Column({ nullable: true })
  ptav_active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
