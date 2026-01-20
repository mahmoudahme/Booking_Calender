import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ResPartner } from './ResPartner.entity';
import { ResCountry } from './ResCountry.entity';

@Entity('patient_model', { schema: 'public' })
export class PatientModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @ManyToOne(() => ResPartner)
  @JoinColumn({ name: 'partner_id' })
  partner!: ResPartner;

  @Column({ nullable: true })
  nationality!: number | null;

  @ManyToOne(() => ResCountry)
  @JoinColumn({ name: 'nationality' })
  nationality_rel!: ResCountry;

  @Column({ nullable: true })
  age!: number | null;

  @Column({ nullable: true })
  department_id!: number | null;

  @Column({ nullable: true })
  admitting_doctor_id!: number | null;

  @Column({ nullable: true })
  beds_available!: number | null;

  @Column({ nullable: true })
  bed_type_id!: number | null;

  @Column({ nullable: true })
  transferred_from_id!: number | null;

  @Column({ nullable: true })
  ward_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  first_name!: string | null;

  @Column({ nullable: true })
  middle_name!: string | null;

  @Column({ nullable: true })
  last_name!: string | null;

  @Column({ nullable: true })
  gender!: string | null;

  @Column({ nullable: true })
  mobile!: string | null;

  @Column({ nullable: true })
  mfn!: string | null;

  @Column({ nullable: true })
  mrn!: string | null;

  @Column({ nullable: true })
  english_name!: string | null;

  @Column({ nullable: true })
  patient_seq!: string | null;

  @Column({ nullable: true })
  phone_country_code!: string | null;

  @Column({ nullable: true })
  phone_number!: string | null;

  @Column({ nullable: true })
  mobile_country_code!: string | null;

  @Column({ nullable: true })
  mobile_number!: string | null;

  @Column({ nullable: true })
  area_village!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  district!: string | null;

  @Column({ nullable: true })
  city_sub_district!: string | null;

  @Column({ nullable: true })
  country!: string | null;

  @Column({ nullable: true })
  religion!: string | null;

  @Column({ nullable: true })
  blood_group!: string | null;

  @Column({ nullable: true })
  marital_status!: string | null;

  @Column({ nullable: true })
  race!: string | null;

  @Column({ nullable: true })
  occupation!: string | null;

  @Column({ nullable: true })
  id_type!: string | null;

  @Column({ nullable: true })
  id_number!: string | null;

  @Column({ nullable: true })
  other_identification_document_types!: string | null;

  @Column({ nullable: true })
  other_identifier_document_value!: string | null;

  @Column({ nullable: true })
  email_id!: string | null;

  @Column({ nullable: true })
  preferred_language!: string | null;

  @Column({ nullable: true })
  pmore!: string | null;

  @Column({ nullable: true })
  sponsor_type!: string | null;

  @Column({ nullable: true })
  bill_type!: string | null;

  @Column({ nullable: true })
  rate_plan!: string | null;

  @Column({ nullable: true })
  referred_by!: string | null;

  @Column({ nullable: true })
  admission_type!: string | null;

  @Column({ nullable: true })
  visit_classification!: string | null;

  @Column({ nullable: true })
  patient_type!: string | null;

  @Column({ nullable: true })
  date_of_birth!: Date | null;

  @Column({ nullable: true })
  expir_date!: Date | null;

  @Column({ nullable: true })
  address!: string | null;

  @Column({ nullable: true })
  remarks!: string | null;

  @Column({ nullable: true })
  complaint!: string | null;

  @Column({ nullable: true })
  mode_sms!: boolean | null;

  @Column({ nullable: true })
  mode_email!: boolean | null;

  @Column({ nullable: true })
  is_foreign!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  available_credit_limit!: number | null;

  @Column({ nullable: true })
  charge!: number | null;

}
