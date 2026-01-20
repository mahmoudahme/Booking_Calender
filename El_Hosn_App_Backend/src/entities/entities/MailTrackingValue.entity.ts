import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_tracking_value', { schema: 'public' })
export class MailTrackingValue {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  field_id!: number | null;

  @Column({ nullable: true })
  old_value_integer!: number | null;

  @Column({ nullable: true })
  new_value_integer!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column()
  mail_message_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  old_value_char!: string | null;

  @Column({ nullable: true })
  new_value_char!: string | null;

  @Column({ nullable: true })
  field_info!: any | null;

  @Column({ nullable: true })
  old_value_text!: string | null;

  @Column({ nullable: true })
  new_value_text!: string | null;

  @Column({ nullable: true })
  old_value_datetime!: Date | null;

  @Column({ nullable: true })
  new_value_datetime!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  old_value_float!: number | null;

  @Column({ nullable: true })
  new_value_float!: number | null;

}
