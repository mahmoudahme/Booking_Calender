import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('doctor_model', { schema: 'public' })
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  age!: number | null;

  @Column()
  doctor_degree!: number;

  @Column()
  doctor_speciality!: number;

  @Column()
  experience_years!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name_ar!: string;

  @Column({ nullable: true })
  age_ar!: string | null;

  @Column({ nullable: true })
  date_of_birth_ar!: string | null;

  @Column({ nullable: true })
  degree_ar!: string | null;

  @Column({ nullable: true })
  speciality_ar!: string | null;

  @Column()
  gender!: string;

  @Column({ nullable: true })
  gender_ar!: string | null;

  @Column({ nullable: true })
  experience_years_ar!: string | null;

  @Column({ nullable: true })
  join_date_ar!: string | null;

  @Column({ nullable: true })
  job_position_ar!: string | null;

  @Column({ nullable: true })
  image_hash!: string | null;

  @Column({ nullable: true })
  profile_image_hash!: string | null;

  @Column({ nullable: true })
  date_of_birth!: Date | null;

  @Column()
  join_date!: Date;

  @Column()
  about!: string;

  @Column({ nullable: true })
  about_ar!: string | null;

  @Column({ nullable: true })
  is_a_doctor!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  branch_id!: number;

  @Column({ nullable: true })
  experience!: number | null;

}
