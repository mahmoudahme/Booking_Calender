import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reconcile_model_line', { schema: 'public' })
export class AccountReconcileModelLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  model_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  sequence!: number;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  amount_type!: string;

  @Column()
  amount_string!: string;

  @Column({ nullable: true })
  analytic_distribution!: any | null;

  @Column({ nullable: true })
  label!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  amount!: number | null;

}
