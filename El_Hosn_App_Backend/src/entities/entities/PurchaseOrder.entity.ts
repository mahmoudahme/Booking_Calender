import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('purchase_order', { schema: 'public' })
export class PurchaseOrder {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  dest_address_id!: number | null;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  invoice_count!: number | null;

  @Column({ nullable: true })
  fiscal_position_id!: number | null;

  @Column({ nullable: true })
  payment_term_id!: number | null;

  @Column({ nullable: true })
  incoterm_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  reminder_date_before_receipt!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  priority!: string | null;

  @Column({ nullable: true })
  origin!: string | null;

  @Column({ nullable: true })
  partner_ref!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  invoice_status!: string | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  amount_untaxed!: number | null;

  @Column({ nullable: true })
  amount_tax!: number | null;

  @Column({ nullable: true })
  amount_total!: number | null;

  @Column({ nullable: true })
  amount_total_cc!: number | null;

  @Column({ nullable: true })
  currency_rate!: number | null;

  @Column({ nullable: true })
  locked!: boolean | null;

  @Column({ nullable: true })
  acknowledged!: boolean | null;

  @Column({ nullable: true })
  receipt_reminder_email!: boolean | null;

  @Column()
  date_order!: Date;

  @Column({ nullable: true })
  date_approve!: Date | null;

  @Column({ nullable: true })
  date_planned!: Date | null;

  @Column({ nullable: true })
  date_calendar_start!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  picking_type_id!: number;

  @Column({ nullable: true })
  incoterm_location!: string | null;

  @Column({ nullable: true })
  receipt_status!: string | null;

  @Column({ nullable: true })
  effective_date!: Date | null;

}
