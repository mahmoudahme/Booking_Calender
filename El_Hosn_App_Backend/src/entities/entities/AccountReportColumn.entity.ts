import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_column', { schema: 'public' })
export class AccountReportColumn {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  report_id!: number | null;

  @Column({ nullable: true })
  custom_audit_action_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  expression_label!: string;

  @Column()
  figure_type!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  sortable!: boolean | null;

  @Column({ nullable: true })
  blank_if_zero!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
