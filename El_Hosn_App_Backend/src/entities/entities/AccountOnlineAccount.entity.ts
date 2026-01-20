import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_online_account', { schema: 'public' })
export class AccountOnlineAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  account_online_link_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  online_identifier!: string | null;

  @Column({ nullable: true })
  account_number!: string | null;

  @Column({ nullable: true })
  account_data!: string | null;

  @Column({ nullable: true })
  fetching_status!: string | null;

  @Column({ nullable: true })
  last_sync!: Date | null;

  @Column({ nullable: true })
  inverse_balance_sign!: boolean | null;

  @Column({ nullable: true })
  inverse_transaction_sign!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  balance!: number | null;

  @Column({ nullable: true })
  available_balance!: number | null;

}
