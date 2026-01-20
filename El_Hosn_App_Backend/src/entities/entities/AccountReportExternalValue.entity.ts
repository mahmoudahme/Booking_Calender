import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_external_value', { schema: 'public' })
export class AccountReportExternalValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  target_report_expression_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  carryover_origin_report_line_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  text_value!: string | null;

  @Column({ nullable: true })
  carryover_origin_expression_label!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  value!: number | null;

}
