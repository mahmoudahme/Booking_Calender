import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spreadsheet_dashboard_share', { schema: 'public' })
export class SpreadsheetDashboardShare {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  dashboard_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  access_token!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
