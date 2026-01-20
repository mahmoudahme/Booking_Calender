import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_cash_rounding', { schema: 'public' })
export class AccountCashRounding {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  strategy!: string;

  @Column()
  rounding_method!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  profit_account_id!: any | null;

  @Column({ nullable: true })
  loss_account_id!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  rounding!: number;

}
