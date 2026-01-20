import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_plan_mail_activity_schedule_rel', { schema: 'public' })
export class MailActivityPlanMailActivityScheduleRel {
  @PrimaryColumn()
  mail_activity_schedule_id!: number;

  @PrimaryColumn()
  mail_activity_plan_id!: number;

}
