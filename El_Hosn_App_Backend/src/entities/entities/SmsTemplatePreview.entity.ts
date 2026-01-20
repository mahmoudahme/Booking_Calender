import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_template_preview', { schema: 'public' })
export class SmsTemplatePreview {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sms_template_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  resource_ref!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
