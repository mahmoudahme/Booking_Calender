import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_autopost_bills_wizard', { schema: 'public' })
export class AccountAutopostBillsWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  nb_unmodified_bills!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
