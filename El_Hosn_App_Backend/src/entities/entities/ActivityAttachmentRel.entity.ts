import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('activity_attachment_rel', { schema: 'public' })
export class ActivityAttachmentRel {
  @PrimaryColumn()
  activity_id!: number;

  @PrimaryColumn()
  attachment_id!: number;

}
