import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account', { schema: 'public' })
export class AccountAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  account_type!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true })
  code_store!: any | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  reconcile!: boolean | null;

  @Column({ nullable: true })
  non_trade!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  fiscal_category_id!: number | null;

  @Column()
  create_asset!: string;

  @Column({ nullable: true })
  multiple_assets_per_line!: boolean | null;

  @Column({ nullable: true })
  account_stock_variation_id!: number | null;

  @Column({ nullable: true })
  account_stock_expense_id!: number | null;

}
