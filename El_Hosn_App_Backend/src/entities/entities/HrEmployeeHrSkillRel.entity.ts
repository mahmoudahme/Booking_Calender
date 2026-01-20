import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee_hr_skill_rel', { schema: 'public' })
export class HrEmployeeHrSkillRel {
  @PrimaryColumn()
  hr_employee_id!: number;

  @PrimaryColumn()
  hr_skill_id!: number;

}
