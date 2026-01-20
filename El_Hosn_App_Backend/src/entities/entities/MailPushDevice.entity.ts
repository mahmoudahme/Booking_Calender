import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_push_device', { schema: 'public' })
export class MailPushDevice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  endpoint!: string;

  @Column()
  keys!: string;

  @Column({ nullable: true })
  expiration_time!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
