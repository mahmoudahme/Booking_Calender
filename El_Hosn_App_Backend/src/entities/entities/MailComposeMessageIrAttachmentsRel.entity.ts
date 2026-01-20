import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_compose_message_ir_attachments_rel', { schema: 'public' })
export class MailComposeMessageIrAttachmentsRel {
  @PrimaryColumn()
  wizard_id!: number;

  @PrimaryColumn()
  attachment_id!: number;

}
