import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spreadsheet_dashboard', { schema: 'public' })
export class SpreadsheetDashboard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dashboard_group_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  sample_dashboard_file_path!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  is_published!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
