import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_departure_wizard_hr_employee_rel', { schema: 'public' })
export class HrDepartureWizardHrEmployeeRel {
  @PrimaryColumn()
  hr_departure_wizard_id!: number;

  @PrimaryColumn()
  hr_employee_id!: number;

}
