import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users', { schema: 'public' })
export class ResUsers {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true, default: () => "true" })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column()
  login!: string;

  @Column({ nullable: true })
  password!: string | null;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  signature!: string | null;

  @Column({ nullable: true })
  share!: boolean | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  totp_last_counter!: number | null;

  @Column({ nullable: true })
  totp_secret!: string | null;

  @Column({ nullable: true })
  tour_enabled!: boolean | null;

  @Column()
  notification_type!: string;

  @Column({ nullable: true })
  manual_im_status!: string | null;

  @Column({ nullable: true })
  out_of_office_message!: string | null;

  @Column({ nullable: true })
  out_of_office_from!: Date | null;

  @Column({ nullable: true })
  out_of_office_to!: Date | null;

  @Column({ nullable: true })
  odoobot_state!: string | null;

  @Column({ nullable: true })
  odoobot_failed!: boolean | null;

  @Column({ nullable: true })
  sale_team_id!: number | null;

  @Column({ type: 'jsonb', nullable: true })
  property_warehouse_id!: any | null;

}
