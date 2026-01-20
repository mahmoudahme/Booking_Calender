import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_register_withholding_line', { schema: 'public' })
export class AccountPaymentRegisterWithholdingLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tax_id!: number;

  @Column({ nullable: true })
  source_currency_id!: number | null;

  @Column({ nullable: true })
  source_tax_id!: number | null;

  @Column()
  account_id!: number;

  @Column()
  company_id!: number;

  @Column()
  payment_register_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  placeholder_value!: string | null;

  @Column()
  placeholder_type!: string;

  @Column({ nullable: true })
  previous_placeholder_type!: string | null;

  @Column({ nullable: true })
  analytic_distribution!: any | null;

  @Column({ nullable: true })
  source_base_amount_currency!: number | null;

  @Column({ nullable: true })
  source_base_amount!: number | null;

  @Column({ nullable: true })
  source_tax_amount_currency!: number | null;

  @Column({ nullable: true })
  source_tax_amount!: number | null;

  @Column({ nullable: true })
  base_amount!: number | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
