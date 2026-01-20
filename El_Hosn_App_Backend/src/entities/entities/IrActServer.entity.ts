import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_server', { schema: 'public' })
export class IrActServer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  binding_model_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type!: string;

  @Column({ nullable: true })
  path!: string | null;

  @Column()
  binding_type!: string;

  @Column({ nullable: true })
  binding_view_types!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  help!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  crud_model_id!: number | null;

  @Column({ nullable: true })
  link_field_id!: number | null;

  @Column({ nullable: true })
  update_field_id!: number | null;

  @Column({ nullable: true })
  update_related_model_id!: number | null;

  @Column({ nullable: true })
  sequence_id!: number | null;

  @Column({ nullable: true })
  selection_value!: number | null;

  @Column({ nullable: true })
  automated_name!: string | null;

  @Column()
  usage!: string;

  @Column()
  state!: string;

  @Column({ nullable: true })
  update_path!: string | null;

  @Column({ nullable: true })
  update_m2m_operation!: string | null;

  @Column({ nullable: true })
  update_boolean_value!: string | null;

  @Column({ nullable: true })
  evaluation_type!: string | null;

  @Column({ nullable: true })
  resource_ref!: string | null;

  @Column({ nullable: true })
  webhook_url!: string | null;

  @Column({ nullable: true })
  code!: string | null;

  @Column({ nullable: true })
  value!: string | null;

  @Column({ nullable: true })
  html_value!: string | null;

  @Column({ nullable: true })
  activity_user_id!: number | null;

  @Column({ nullable: true })
  activity_type_id!: number | null;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column({ nullable: true })
  activity_date_deadline_range!: number | null;

  @Column({ nullable: true })
  activity_summary!: string | null;

  @Column({ nullable: true })
  followers_type!: string | null;

  @Column({ nullable: true })
  followers_partner_field_name!: string | null;

  @Column({ nullable: true })
  mail_post_method!: string | null;

  @Column({ nullable: true })
  activity_date_deadline_range_type!: string | null;

  @Column({ nullable: true })
  activity_user_type!: string | null;

  @Column({ nullable: true })
  activity_user_field_name!: string | null;

  @Column({ nullable: true })
  activity_note!: string | null;

  @Column({ nullable: true })
  mail_post_autofollow!: boolean | null;

  @Column({ nullable: true })
  sms_template_id!: number | null;

  @Column({ nullable: true })
  sms_method!: string | null;

  @Column({ nullable: true })
  base_automation_id!: number | null;

}
