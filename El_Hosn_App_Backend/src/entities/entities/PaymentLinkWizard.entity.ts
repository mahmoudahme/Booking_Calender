import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_link_wizard', { schema: 'public' })
export class PaymentLinkWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  res_model!: string;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  amount_max!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  discount_date!: Date | null;

  @Column({ nullable: true })
  open_installments!: any | null;

  @Column({ nullable: true })
  has_eligible_epd!: boolean | null;

  @Column({ nullable: true })
  amount_paid!: number | null;

  @Column({ nullable: true })
  prepayment_amount!: number | null;

}
