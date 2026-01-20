import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee_category_rel', { schema: 'public' })
export class EmployeeCategoryRel {
  @PrimaryColumn()
  employee_id!: number;

  @PrimaryColumn()
  category_id!: number;

}
