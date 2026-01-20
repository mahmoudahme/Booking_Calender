import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_term', { schema: 'public' })
export class AccountPaymentTerm {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  sequence!: number;

  @Column({ nullable: true })
  discount_days!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  early_pay_discount_computation!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  note!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  display_on_invoice!: boolean | null;

  @Column({ nullable: true })
  early_discount!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  discount_percentage!: number | null;

}
