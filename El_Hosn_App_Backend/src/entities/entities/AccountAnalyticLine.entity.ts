import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_analytic_line', { schema: 'public' })
export class AccountAnalyticLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column({ nullable: true })
  product_uom_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  category!: string | null;

  @Column()
  date!: Date;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  unit_amount!: number | null;

  @Column({ nullable: true })
  product_id!: number | null;

  @Column({ nullable: true })
  general_account_id!: number | null;

  @Column({ nullable: true })
  journal_id!: number | null;

  @Column({ nullable: true })
  move_line_id!: number | null;

  @Column({ nullable: true, length: 8 })
  code!: string | null;

  @Column({ nullable: true })
  ref!: string | null;

  @Column({ nullable: true })
  so_line!: number | null;

}
