import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_followup_manual_reminder_ir_attachment_rel', { schema: 'public' })
export class AccountFollowupManualReminderIrAttachmentRel {
  @PrimaryColumn()
  account_followup_manual_reminder_id!: number;

  @PrimaryColumn()
  ir_attachment_id!: number;

}
