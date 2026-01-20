import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_storage_category_capacity', { schema: 'public' })
export class StockStorageCategoryCapacity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  storage_category_id!: number;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  package_type_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  quantity!: number;

}
