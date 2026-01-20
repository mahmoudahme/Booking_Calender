import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_presence', { schema: 'public' })
export class MailPresence {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  guest_id!: number | null;

  @Column({ nullable: true })
  status!: string | null;

  @Column({ nullable: true })
  last_poll!: Date | null;

  @Column({ nullable: true })
  last_presence!: Date | null;

}
