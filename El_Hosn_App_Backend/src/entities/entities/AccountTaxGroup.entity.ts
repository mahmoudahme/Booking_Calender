import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_group', { schema: 'public' })
export class AccountTaxGroup {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  tax_payable_account_id!: number | null;

  @Column({ nullable: true })
  tax_receivable_account_id!: number | null;

  @Column({ nullable: true })
  advance_tax_payment_account_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  pos_receipt_label!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  preceding_subtotal!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
