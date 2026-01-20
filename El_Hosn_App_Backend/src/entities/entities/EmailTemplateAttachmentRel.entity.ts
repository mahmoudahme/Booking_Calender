import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('email_template_attachment_rel', { schema: 'public' })
export class EmailTemplateAttachmentRel {
  @PrimaryColumn()
  email_template_id!: number;

  @PrimaryColumn()
  attachment_id!: number;

}
