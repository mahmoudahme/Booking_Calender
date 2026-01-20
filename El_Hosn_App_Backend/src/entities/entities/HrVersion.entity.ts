import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_version', { schema: 'public' })
export class HrVersion {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  employee_id!: number | null;

  @Column()
  last_modified_uid!: number;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  private_state_id!: number | null;

  @Column({ nullable: true })
  private_country_id!: number | null;

  @Column({ nullable: true })
  distance_home_work!: number | null;

  @Column({ nullable: true })
  km_home_work!: number | null;

  @Column({ nullable: true })
  children!: number | null;

  @Column({ nullable: true })
  department_id!: number | null;

  @Column({ nullable: true })
  job_id!: number | null;

  @Column({ nullable: true })
  address_id!: number | null;

  @Column({ nullable: true })
  work_location_id!: number | null;

  @Column({ nullable: true })
  departure_reason_id!: number | null;

  @Column({ nullable: true })
  resource_calendar_id!: number | null;

  @Column({ nullable: true })
  contract_template_id!: number | null;

  @Column({ nullable: true })
  structure_type_id!: number | null;

  @Column({ nullable: true })
  contract_type_id!: number | null;

  @Column()
  hr_responsible_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  identification_id!: string | null;

  @Column({ nullable: true })
  ssnid!: string | null;

  @Column({ nullable: true })
  passport_id!: string | null;

  @Column({ nullable: true })
  sex!: string | null;

  @Column({ nullable: true })
  private_street!: string | null;

  @Column({ nullable: true })
  private_street2!: string | null;

  @Column({ nullable: true })
  private_city!: string | null;

  @Column({ nullable: true })
  private_zip!: string | null;

  @Column()
  distance_home_work_unit!: string;

  @Column()
  marital!: string;

  @Column({ nullable: true })
  spouse_complete_name!: string | null;

  @Column()
  employee_type!: string;

  @Column({ nullable: true })
  job_title!: string | null;

  @Column()
  date_version!: Date;

  @Column({ nullable: true })
  passport_expiration_date!: Date | null;

  @Column({ nullable: true })
  spouse_birthdate!: Date | null;

  @Column({ nullable: true })
  departure_date!: Date | null;

  @Column({ nullable: true })
  contract_date_start!: Date | null;

  @Column({ nullable: true })
  contract_date_end!: Date | null;

  @Column({ nullable: true })
  trial_date_end!: Date | null;

  @Column({ nullable: true })
  departure_description!: string | null;

  @Column({ nullable: true })
  additional_note!: string | null;

  @Column({ nullable: true })
  wage!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  is_custom_job_title!: boolean | null;

  @Column({ nullable: true })
  is_flexible!: boolean | null;

  @Column({ nullable: true })
  is_fully_flexible!: boolean | null;

  @Column()
  last_modified_date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
