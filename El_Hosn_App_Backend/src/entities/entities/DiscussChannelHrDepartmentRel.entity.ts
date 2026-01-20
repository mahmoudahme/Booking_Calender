import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_channel_hr_department_rel', { schema: 'public' })
export class DiscussChannelHrDepartmentRel {
  @PrimaryColumn()
  discuss_channel_id!: number;

  @PrimaryColumn()
  hr_department_id!: number;

}
