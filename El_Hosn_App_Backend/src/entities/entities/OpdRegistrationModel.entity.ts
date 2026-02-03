import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('opd_registration_model', { schema: 'public' })
export class OpdRegistrationModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  patient_id!: number | null;

  @Column({ nullable: true })
  age!: number | null;

  @Column({ nullable: true })
  doctor_id!: number | null;

  @Column({ nullable: true })
  subtime!: number | null;

  @Column({ nullable: true })
  computed_sequence!: number | null;

  @Column({ nullable: true })
  limit!: number | null;

  @Column({ nullable: true })
  remaining!: number | null;

  @Column({ nullable: true })
  booked!: number | null;

  @Column({ nullable: true })
  doctor_find_us!: number | null;

  @Column({ nullable: true })
  patient_nationality!: number | null;

  @Column({ nullable: true })
  cityy!: number | null;

  @Column({ nullable: true })
  company!: number | null;

  @Column({ nullable: true })
  nok_cityy!: number | null;

  @Column({ nullable: true })
  nok_nationality!: number | null;

  @Column({ nullable: true })
  nationality_id!: number | null;

  @Column({ nullable: true })
  department_id!: number | null;

  @Column({ nullable: true })
  admitting_doctor_id!: number | null;

  @Column({ nullable: true })
  bed_type_id!: number | null;

  @Column({ nullable: true })
  ward_id!: number | null;

  @Column({ nullable: true })
  transferred_from!: number | null;

  @Column({ nullable: true })
  beds_available!: number | null;

  @Column({ nullable: true })
  invoice!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  reg_seq!: string | null;

  @Column({ nullable: true })
  mfn!: string | null;

  @Column({ nullable: true })
  mrn!: string | null;

  @Column({ nullable: true })
  patient_name!: string | null;

  @Column({ nullable: true })
  english_name!: string | null;

  @Column({ nullable: true })
  mobile!: string | null;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  vat!: string | null;

  @Column({ nullable: true })
  passport!: string | null;

  @Column({ nullable: true })
  patient_type!: string | null;

  @Column({ nullable: true })
  gender!: string | null;

  @Column({ nullable: true })
  appointment_state!: string | null;

  @Column({ nullable: true })
  payment_state!: string | null;

  @Column({ nullable: true })
  missed_state!: string | null;

  @Column({ nullable: true })
  new_or_exist!: string | null;

  @Column({ nullable: true })
  payment_type!: string | null;

  @Column({ nullable: true })
  doctor_schedule!: string | null;

  @Column({ nullable: true })
  how_you_find_us!: string | null;

  @Column({ nullable: true })
  src_of_business!: string | null;

  @Column({ nullable: true })
  status!: string | null;

  @Column({ nullable: true })
  insurance_no!: string | null;

  @Column({ nullable: true })
  dr_rec_name!: string | null;

  @Column({ nullable: true })
  payment_way!: string | null;

  @Column({ nullable: true })
  nok_first_name!: string | null;

  @Column({ nullable: true })
  nok_middle_name!: string | null;

  @Column({ nullable: true })
  nok_last_name!: string | null;

  @Column({ nullable: true })
  nok_relation!: string | null;

  @Column({ nullable: true })
  nok_contact_no!: string | null;

  @Column({ nullable: true })
  nok_phone_no!: string | null;

  @Column({ nullable: true })
  nok_email!: string | null;

  @Column({ nullable: true })
  area_village!: string | null;

  @Column({ nullable: true })
  district!: string | null;

  @Column({ nullable: true })
  blood_group!: string | null;

  @Column({ nullable: true })
  marital_status!: string | null;

  @Column({ nullable: true })
  religion!: string | null;

  @Column({ nullable: true })
  race!: string | null;

  @Column({ nullable: true })
  occupation!: string | null;

  @Column({ nullable: true })
  id_type!: string | null;

  @Column({ nullable: true })
  id_number!: string | null;

  @Column({ nullable: true })
  other_identifier_type!: string | null;

  @Column({ nullable: true })
  other_identifier_value!: string | null;

  @Column({ nullable: true })
  preferred_language!: string | null;

  @Column({ nullable: true })
  bill_type!: string | null;

  @Column({ nullable: true })
  admission_type!: string | null;

  @Column({ nullable: true })
  visit_classification!: string | null;

  @Column({ nullable: true })
  referred_by!: string | null;

  @Column({ nullable: true })
  date_of_birth!: Date | null;

  @Column({ nullable: true })
  search_date!: Date | null;

  @Column({ nullable: true })
  cancellation_reason!: string | null;

  @Column({ nullable: true })
  notes!: string | null;

  @Column({ nullable: true })
  other_notes!: string | null;

  @Column({ nullable: true })
  nok_address!: string | null;

  @Column({ nullable: true })
  address!: string | null;

  @Column({ nullable: true })
  remarks!: string | null;

  @Column({ nullable: true })
  complaint!: string | null;

  @Column({ nullable: true })
  is_foreign!: boolean | null;

  @Column({ nullable: true })
  vip!: boolean | null;

  @Column({ nullable: true })
  is_readonly!: boolean | null;

  @Column({ nullable: true })
  communication_sms!: boolean | null;

  @Column({ nullable: true })
  communication_email!: boolean | null;

  @Column({ nullable: true })
  primary_sponsor!: boolean | null;

  @Column({ nullable: true })
  secondary_sponsor!: boolean | null;

  @Column({ nullable: true })
  appointment_date!: Date | null;

  @Column({ nullable: true })
  end_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  total!: number | null;

  @Column({ nullable: true })
  total_amount!: number | null;

  @Column({ nullable: true })
  paid_cashier!: number | null;

  @Column({ nullable: true })
  remaining_cashier!: number | null;

  @Column({ nullable: true })
  cashier_total_price!: number | null;

  @Column({ nullable: true })
  refunded_amount!: number | null;

  @Column({ nullable: true })
  available_credit_limit!: number | null;

  @Column({ nullable: true })
  charge!: number | null;

  @Column({ nullable: true })
  payment_amount!: number | null;

  @Column({ nullable: true })
  nurse_id!: number | null;

  @Column({ nullable: true })
  nationality!: number | null;

  @Column({ nullable: true })
  deposit_invoice_id!: number | null;

  @Column({ nullable: true })
  deposit_group_id!: number | null;

  @Column({ nullable: true })
  is_deposit_registration!: boolean | null;

  @Column({ nullable: true })
  prescription_template_id!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  phone_country_code!: string | null;

  @Column({ nullable: true })
  phone_number!: string | null;

}
