import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_translation', { schema: 'public' })
export class MailMessageTranslation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  message_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  source_lang!: string;

  @Column()
  target_lang!: string;

  @Column()
  body!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
