import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_job_hr_skill_rel', { schema: 'public' })
export class HrJobHrSkillRel {
  @PrimaryColumn()
  hr_job_id!: number;

  @PrimaryColumn()
  hr_skill_id!: number;

}
