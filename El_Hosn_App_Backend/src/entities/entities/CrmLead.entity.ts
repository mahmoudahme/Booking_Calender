import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crm_lead', { schema: 'public' })
export class CrmLead {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  campaign_id!: number | null;

  @Column({ nullable: true })
  source_id!: number | null;

  @Column({ nullable: true })
  medium_id!: number | null;

  @Column({ nullable: true })
  message_bounce!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  team_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  stage_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  recurring_plan!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  lang_id!: number | null;

  @Column({ nullable: true })
  state_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  lost_reason_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  phone_sanitized!: string | null;

  @Column({ nullable: true })
  email_normalized!: string | null;

  @Column({ nullable: true })
  email_cc!: string | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  referred!: string | null;

  @Column()
  type!: string;

  @Column({ nullable: true })
  priority!: string | null;

  @Column({ nullable: true })
  contact_name!: string | null;

  @Column({ nullable: true })
  partner_name!: string | null;

  @Column({ nullable: true })
  function!: string | null;

  @Column({ nullable: true })
  email_from!: string | null;

  @Column({ nullable: true })
  email_domain_criterion!: string | null;

  @Column({ nullable: true })
  phone!: string | null;

  @Column({ nullable: true })
  phone_state!: string | null;

  @Column({ nullable: true })
  email_state!: string | null;

  @Column({ nullable: true })
  website!: string | null;

  @Column({ nullable: true })
  street!: string | null;

  @Column({ nullable: true })
  street2!: string | null;

  @Column({ nullable: true })
  zip!: string | null;

  @Column({ nullable: true })
  city!: string | null;

  @Column({ nullable: true })
  won_status!: string | null;

  @Column({ nullable: true })
  date_deadline!: Date | null;

  @Column({ type: 'jsonb', nullable: true })
  lead_properties!: any | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  expected_revenue!: number | null;

  @Column({ nullable: true })
  prorated_revenue!: number | null;

  @Column({ nullable: true })
  recurring_revenue!: number | null;

  @Column({ nullable: true })
  recurring_revenue_monthly!: number | null;

  @Column({ nullable: true })
  recurring_revenue_monthly_prorated!: number | null;

  @Column({ nullable: true })
  recurring_revenue_prorated!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  date_closed!: Date | null;

  @Column({ nullable: true })
  date_automation_last!: Date | null;

  @Column({ nullable: true })
  date_open!: Date | null;

  @Column({ nullable: true })
  date_last_stage_update!: Date | null;

  @Column({ nullable: true })
  date_conversion!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  day_open!: number | null;

  @Column({ nullable: true })
  day_close!: number | null;

  @Column({ nullable: true })
  probability!: number | null;

  @Column({ nullable: true })
  automated_probability!: number | null;

  @Column({ nullable: true })
  days_to_convert!: number | null;

  @Column({ nullable: true })
  days_exceeding_closing!: number | null;

  @Column({ nullable: true })
  reveal_id!: string | null;

  @Column({ nullable: true })
  iap_enrich_done!: boolean | null;

  @Column({ nullable: true })
  lead_mining_request_id!: number | null;

  @Column({ nullable: true })
  patient_first_name!: string | null;

  @Column({ nullable: true })
  patient_last_name!: string | null;

  @Column({ nullable: true })
  patient_phone!: string | null;

  @Column({ nullable: true })
  patient_email!: string | null;

  @Column({ nullable: true })
  patient_street!: string | null;

  @Column({ nullable: true })
  doctor_name!: string | null;

  @Column({ nullable: true })
  patient_city!: string | null;

  @Column({ nullable: true })
  patient_country!: string | null;

  @Column({ nullable: true })
  external_order_id!: string | null;

  @Column({ nullable: true })
  order_payment_method!: string | null;

  @Column({ nullable: true })
  order_status!: string | null;

  @Column({ nullable: true })
  order_items_json!: string | null;

  @Column({ nullable: true })
  customer_note!: string | null;

  @Column({ nullable: true })
  order_total!: number | null;

  @Column({ nullable: true })
  paid!: boolean | null;

  @Column({ nullable: true })
  lead_source!: string | null;

  @Column({ nullable: true })
  client_message!: string | null;

  @Column({ nullable: true })
  website_booking_date!: Date | null;

}
