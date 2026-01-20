import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employee_bank_account_rel', { schema: 'public' })
export class EmployeeBankAccountRel {
  @PrimaryColumn()
  employee_id!: number;

  @PrimaryColumn()
  bank_account_id!: number;

}
