import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reconcile_wizard', { schema: 'public' })
export class AccountReconcileWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column({ nullable: true })
  to_partner_id!: number | null;

  @Column({ nullable: true })
  tax_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  label!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  edit_mode_amount_currency!: number | null;

  @Column({ nullable: true })
  allow_partials!: boolean | null;

  @Column({ nullable: true })
  to_check!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
