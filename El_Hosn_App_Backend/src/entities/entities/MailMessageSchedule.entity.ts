import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_schedule', { schema: 'public' })
export class MailMessageSchedule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mail_message_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  notification_parameters!: string | null;

  @Column()
  scheduled_datetime!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
