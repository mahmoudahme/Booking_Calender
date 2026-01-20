import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_analytic_plan', { schema: 'public' })
export class AccountAnalyticPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  parent_path!: string | null;

  @Column({ nullable: true })
  complete_name!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  default_applicability!: any | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
