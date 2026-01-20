import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_sms', { schema: 'public' })
export class SmsSms {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  mail_message_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  uuid!: string | null;

  @Column({ nullable: true })
  number!: string | null;

  @Column()
  state!: string;

  @Column({ nullable: true })
  failure_type!: string | null;

  @Column({ nullable: true })
  body!: string | null;

  @Column({ nullable: true })
  to_delete!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
