import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_refund_wizard', { schema: 'public' })
export class PaymentRefundWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  payment_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  amount_to_refund!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
