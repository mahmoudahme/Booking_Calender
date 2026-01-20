import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_template_preview', { schema: 'public' })
export class MailTemplatePreview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mail_template_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  resource_ref!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
