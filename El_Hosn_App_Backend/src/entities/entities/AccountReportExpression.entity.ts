import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_expression', { schema: 'public' })
export class AccountReportExpression {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  report_line_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  label!: string;

  @Column()
  engine!: string;

  @Column()
  formula!: string;

  @Column({ nullable: true })
  subformula!: string | null;

  @Column()
  date_scope!: string;

  @Column({ nullable: true })
  figure_type!: string | null;

  @Column({ nullable: true })
  carryover_target!: string | null;

  @Column({ nullable: true })
  green_on_positive!: boolean | null;

  @Column({ nullable: true })
  blank_if_zero!: boolean | null;

  @Column({ nullable: true })
  auditable!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
