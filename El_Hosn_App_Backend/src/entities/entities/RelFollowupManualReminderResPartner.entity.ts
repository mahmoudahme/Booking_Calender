import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('rel_followup_manual_reminder_res_partner', { schema: 'public' })
export class RelFollowupManualReminderResPartner {
  @PrimaryColumn()
  account_followup_manual_reminder_id!: number;

  @PrimaryColumn()
  res_partner_id!: number;

}
