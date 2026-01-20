import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_link_preview', { schema: 'public' })
export class MailMessageLinkPreview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message_id!: number;

  @Column()
  link_preview_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  is_hidden!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
