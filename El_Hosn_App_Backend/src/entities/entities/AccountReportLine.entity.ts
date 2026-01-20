import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_line', { schema: 'public' })
export class AccountReportLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  report_id!: number;

  @Column()
  hierarchy_level!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  groupby!: string | null;

  @Column({ nullable: true })
  user_groupby!: string | null;

  @Column({ nullable: true })
  code!: string | null;

  @Column({ nullable: true })
  horizontal_split_side!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  foldable!: boolean | null;

  @Column({ nullable: true })
  print_on_new_page!: boolean | null;

  @Column({ nullable: true })
  hide_if_zero!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
