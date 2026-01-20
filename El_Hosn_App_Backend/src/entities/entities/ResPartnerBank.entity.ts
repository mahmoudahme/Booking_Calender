import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_partner_bank', { schema: 'public' })
export class ResPartnerBank {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  bank_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  acc_number!: string;

  @Column({ nullable: true })
  clearing_number!: string | null;

  @Column({ nullable: true })
  sanitized_acc_number!: string | null;

  @Column({ nullable: true })
  acc_holder_name!: string | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  allow_out_payment!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  has_iban_warning!: boolean | null;

  @Column({ nullable: true })
  has_money_transfer_warning!: boolean | null;

}
