import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_label_layout', { schema: 'public' })
export class ProductLabelLayout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  custom_quantity!: number;

  @Column({ nullable: true })
  pricelist_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  print_format!: string;

  @Column({ nullable: true })
  extra_html!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  move_quantity!: string;

  @Column()
  zpl_template!: string;

}
