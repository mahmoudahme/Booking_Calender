import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_report_horizontal_group_rule', { schema: 'public' })
export class AccountReportHorizontalGroupRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  horizontal_group_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  domain!: string;

  @Column()
  field_name!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
