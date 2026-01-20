import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee', { schema: 'public' })
export class HrEmployee {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  resource_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  message_main_attachment_id!: number | null;

  @Column({ nullable: true })
  current_version_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  work_contact_id!: number | null;

  @Column({ nullable: true })
  country_of_birth!: number | null;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  coach_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  work_phone!: string | null;

  @Column({ nullable: true })
  mobile_phone!: string | null;

  @Column({ nullable: true })
  work_email!: string | null;

  @Column({ nullable: true })
  legal_name!: string | null;

  @Column({ nullable: true })
  private_phone!: string | null;

  @Column({ nullable: true })
  private_email!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  place_of_birth!: string | null;

  @Column({ nullable: true })
  permit_no!: string | null;

  @Column({ nullable: true })
  visa_no!: string | null;

  @Column({ nullable: true })
  certificate!: string | null;

  @Column({ nullable: true })
  study_field!: string | null;

  @Column({ nullable: true })
  study_school!: string | null;

  @Column({ nullable: true })
  emergency_contact!: string | null;

  @Column({ nullable: true })
  emergency_phone!: string | null;

  @Column({ nullable: true })
  barcode!: string | null;

  @Column({ nullable: true })
  pin!: string | null;

  @Column({ nullable: true })
  private_car_plate!: string | null;

  @Column({ nullable: true })
  birthday!: Date | null;

  @Column({ nullable: true })
  visa_expire!: Date | null;

  @Column({ nullable: true })
  work_permit_expiration_date!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  salary_distribution!: any | null;

  @Column({ type: 'jsonb', nullable: true })
  employee_properties!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  birthday_public_display!: boolean | null;

  @Column({ nullable: true })
  work_permit_scheduled_activity!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  monday_location_id!: number | null;

  @Column({ nullable: true })
  tuesday_location_id!: number | null;

  @Column({ nullable: true })
  wednesday_location_id!: number | null;

  @Column({ nullable: true })
  thursday_location_id!: number | null;

  @Column({ nullable: true })
  friday_location_id!: number | null;

  @Column({ nullable: true })
  saturday_location_id!: number | null;

  @Column({ nullable: true })
  sunday_location_id!: number | null;

  @Column({ nullable: true })
  today_location_name!: string | null;

}
