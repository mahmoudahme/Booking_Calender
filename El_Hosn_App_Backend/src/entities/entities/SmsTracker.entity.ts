import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_tracker', { schema: 'public' })
export class SmsTracker {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  mail_notification_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  sms_uuid!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
