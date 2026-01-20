import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor_schedule', { schema: 'public' })
export class DoctorSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  doctor_id!: number | null;

  @Column({ nullable: true })
  new_doctor_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  period_type!: string;

  @Column()
  day_field!: string;

  @Column({ nullable: true })
  timerange!: string | null;

  @Column({ nullable: true })
  start_time_type!: string | null;

  @Column({ nullable: true })
  end_time_type!: string | null;

  @Column({ nullable: true })
  desc!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  start_time!: number;

  @Column()
  end_time!: number;

  @Column()
  period!: number;

}
