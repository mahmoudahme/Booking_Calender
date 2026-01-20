import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product_fetch_image_wizard', { schema: 'public' })
export class ProductFetchImageWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  nb_products_selected!: number | null;

  @Column({ nullable: true })
  nb_products_to_process!: number | null;

  @Column({ nullable: true })
  nb_products_unable_to_process!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
