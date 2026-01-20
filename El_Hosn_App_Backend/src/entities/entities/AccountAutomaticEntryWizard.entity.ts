import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_automatic_entry_wizard', { schema: 'public' })
export class AccountAutomaticEntryWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  destination_account_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  action!: string;

  @Column({ nullable: true })
  account_type!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  total_amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  percentage!: number | null;

}
