import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee_hr_employee_cv_wizard_rel', { schema: 'public' })
export class HrEmployeeHrEmployeeCvWizardRel {
  @PrimaryColumn()
  hr_employee_cv_wizard_id!: number;

  @PrimaryColumn()
  hr_employee_id!: number;

}
