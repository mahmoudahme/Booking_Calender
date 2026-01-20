import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_schedule_line', { schema: 'public' })
export class MailActivityScheduleLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activity_schedule_id!: number;

  @Column({ nullable: true })
  responsible_user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  line_description!: string | null;

  @Column({ nullable: true })
  line_date_deadline!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
