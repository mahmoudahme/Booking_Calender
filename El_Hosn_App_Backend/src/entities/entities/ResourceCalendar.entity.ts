import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource_calendar', { schema: 'public' })
export class ResourceCalendar {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  schedule_type!: string;

  @Column()
  tz!: string;

  @Column({ nullable: true })
  hours_per_day!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  duration_based!: boolean | null;

  @Column({ nullable: true })
  flexible_hours!: boolean | null;

  @Column({ nullable: true })
  two_weeks_calendar!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  full_time_required_hours!: number | null;

  @Column({ nullable: true })
  hours_per_week!: number | null;

}
