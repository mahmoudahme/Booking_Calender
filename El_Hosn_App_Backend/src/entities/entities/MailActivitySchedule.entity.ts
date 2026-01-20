import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_schedule', { schema: 'public' })
export class MailActivitySchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  res_model_id!: number | null;

  @Column({ nullable: true })
  plan_id!: number | null;

  @Column({ nullable: true })
  plan_on_demand_user_id!: number | null;

  @Column({ nullable: true })
  activity_type_id!: number | null;

  @Column({ nullable: true })
  activity_user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column({ nullable: true })
  summary!: string | null;

  @Column({ nullable: true })
  plan_date!: Date | null;

  @Column({ nullable: true })
  date_deadline!: Date | null;

  @Column({ nullable: true })
  res_ids!: string | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
