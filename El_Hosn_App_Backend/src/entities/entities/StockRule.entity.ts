import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('stock_rule', { schema: 'public' })
export class StockRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  location_dest_id!: number;

  @Column({ nullable: true })
  location_src_id!: number | null;

  @Column()
  route_id!: number;

  @Column({ nullable: true })
  route_sequence!: number | null;

  @Column()
  picking_type_id!: number;

  @Column({ nullable: true })
  delay!: number | null;

  @Column({ nullable: true })
  partner_address_id!: number | null;

  @Column({ nullable: true })
  warehouse_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  action!: string;

  @Column()
  procure_method!: string;

  @Column()
  auto!: string;

  @Column({ nullable: true })
  push_domain!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  location_dest_from_rule!: boolean | null;

  @Column({ nullable: true })
  propagate_cancel!: boolean | null;

  @Column({ nullable: true })
  propagate_carrier!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
