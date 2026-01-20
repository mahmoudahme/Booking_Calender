import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_accrued_orders_wizard', { schema: 'public' })
export class AccountAccruedOrdersWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column()
  account_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  date!: Date;

  @Column()
  reversal_date!: Date;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
