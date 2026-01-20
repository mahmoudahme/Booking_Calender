import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('resource_calendar_attendance', { schema: 'public' })
export class ResourceCalendarAttendance {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  calendar_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  dayofweek!: string;

  @Column()
  day_period!: string;

  @Column({ nullable: true })
  week_type!: string | null;

  @Column({ nullable: true })
  display_type!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  hour_from!: number;

  @Column()
  hour_to!: number;

  @Column({ nullable: true })
  duration_hours!: number | null;

  @Column({ nullable: true })
  duration_days!: number | null;

}
