import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity', { schema: 'public' })
export class MailActivity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  res_model_id!: number | null;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  activity_type_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  recommended_activity_type_id!: number | null;

  @Column({ nullable: true })
  previous_activity_type_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column({ nullable: true })
  res_name!: string | null;

  @Column({ nullable: true })
  summary!: string | null;

  @Column({ nullable: true })
  user_tz!: string | null;

  @Column()
  date_deadline!: Date;

  @Column({ nullable: true })
  date_done!: Date | null;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  feedback!: string | null;

  @Column({ nullable: true })
  automated!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  studio_approval_request_id!: number | null;

}
