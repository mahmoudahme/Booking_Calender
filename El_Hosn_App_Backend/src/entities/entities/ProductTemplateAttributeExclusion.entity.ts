import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_template_attribute_exclusion', { schema: 'public' })
export class ProductTemplateAttributeExclusion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  product_template_attribute_value_id!: number | null;

  @Column()
  product_tmpl_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
