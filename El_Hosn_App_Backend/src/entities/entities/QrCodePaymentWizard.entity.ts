import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('qr_code_payment_wizard', { schema: 'public' })
export class QrCodePaymentWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  partner_bank_id!: number | null;

  @Column()
  return_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  amount_to_pay!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
