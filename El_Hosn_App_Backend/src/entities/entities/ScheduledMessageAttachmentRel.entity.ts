import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('scheduled_message_attachment_rel', { schema: 'public' })
export class ScheduledMessageAttachmentRel {
  @PrimaryColumn()
  scheduled_message_id!: number;

  @PrimaryColumn()
  attachment_id!: number;

}
