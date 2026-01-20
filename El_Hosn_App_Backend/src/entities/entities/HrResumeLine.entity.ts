import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_resume_line', { schema: 'public' })
export class HrResumeLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @Column({ nullable: true })
  duration!: number | null;

  @Column({ nullable: true })
  line_type_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  course_type!: string;

  @Column({ nullable: true })
  external_url!: string | null;

  @Column({ nullable: true })
  certificate_filename!: string | null;

  @Column()
  date_start!: Date;

  @Column({ nullable: true })
  date_end!: Date | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true })
  resume_line_properties!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
