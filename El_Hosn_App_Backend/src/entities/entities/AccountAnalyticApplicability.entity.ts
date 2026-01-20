import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_analytic_applicability', { schema: 'public' })
export class AccountAnalyticApplicability {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  analytic_plan_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  business_domain!: string;

  @Column()
  applicability!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  product_categ_id!: number | null;

  @Column({ nullable: true })
  account_prefix!: string | null;

}
