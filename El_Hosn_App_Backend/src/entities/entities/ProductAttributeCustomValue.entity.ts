import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_attribute_custom_value', { schema: 'public' })
export class ProductAttributeCustomValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  custom_product_template_attribute_value_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  custom_value!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  sale_order_line_id!: number | null;

}
