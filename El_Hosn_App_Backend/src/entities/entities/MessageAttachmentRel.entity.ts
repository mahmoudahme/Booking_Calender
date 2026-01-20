import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('message_attachment_rel', { schema: 'public' })
export class MessageAttachmentRel {
  @PrimaryColumn()
  message_id!: number;

  @PrimaryColumn()
  attachment_id!: number;

}
