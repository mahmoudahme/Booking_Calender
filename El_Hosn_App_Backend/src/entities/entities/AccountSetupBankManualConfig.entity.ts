import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_setup_bank_manual_config', { schema: 'public' })
export class AccountSetupBankManualConfig {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  res_partner_bank_id!: number;

  @Column({ nullable: true })
  num_journals_without_account_bank!: number | null;

  @Column({ nullable: true })
  num_journals_without_account_credit!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  new_journal_name!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
