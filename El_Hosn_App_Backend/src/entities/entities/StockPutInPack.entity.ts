import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_put_in_pack', { schema: 'public' })
export class StockPutInPack {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  location_dest_id!: number | null;

  @Column({ nullable: true })
  package_type_id!: number | null;

  @Column({ nullable: true })
  result_package_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
