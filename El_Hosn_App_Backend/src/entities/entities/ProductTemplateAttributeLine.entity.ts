import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_template_attribute_line', { schema: 'public' })
export class ProductTemplateAttributeLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  product_tmpl_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  attribute_id!: number;

  @Column({ nullable: true })
  value_count!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
