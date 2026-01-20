import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_reaction', { schema: 'public' })
export class MailMessageReaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message_id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  guest_id!: number | null;

  @Column()
  content!: string;

}
