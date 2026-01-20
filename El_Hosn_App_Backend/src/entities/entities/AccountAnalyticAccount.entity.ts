import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_analytic_account', { schema: 'public' })
export class AccountAnalyticAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plan_id!: number;

  @Column({ nullable: true })
  root_plan_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  code!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
