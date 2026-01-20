import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_picking', { schema: 'public' })
export class StockPicking {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  backorder_id!: number | null;

  @Column({ nullable: true })
  return_id!: number | null;

  @Column()
  location_id!: number;

  @Column()
  location_dest_id!: number;

  @Column()
  picking_type_id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  owner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  origin!: string | null;

  @Column()
  move_type!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  priority!: string | null;

  @Column({ nullable: true })
  picking_properties!: any | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  shipping_weight!: number | null;

  @Column({ nullable: true })
  has_deadline_issue!: boolean | null;

  @Column({ nullable: true })
  printed!: boolean | null;

  @Column({ nullable: true })
  is_locked!: boolean | null;

  @Column({ nullable: true })
  scheduled_date!: Date | null;

  @Column({ nullable: true })
  date_deadline!: Date | null;

  @Column({ nullable: true })
  date_done!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  sale_id!: number | null;

}
