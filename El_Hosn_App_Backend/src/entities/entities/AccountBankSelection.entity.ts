import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_bank_selection', { schema: 'public' })
export class AccountBankSelection {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  account_online_link_id!: number | null;

  @Column({ nullable: true })
  selected_account!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
