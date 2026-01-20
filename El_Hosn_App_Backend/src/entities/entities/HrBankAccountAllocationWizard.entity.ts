import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_bank_account_allocation_wizard', { schema: 'public' })
export class HrBankAccountAllocationWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  employee_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
