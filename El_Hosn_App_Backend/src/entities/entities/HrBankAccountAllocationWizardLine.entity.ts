import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_bank_account_allocation_wizard_line', { schema: 'public' })
export class HrBankAccountAllocationWizardLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wizard_id!: number;

  @Column()
  bank_account_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  amount_type!: string | null;

  @Column({ nullable: true })
  amount!: number | null;

  @Column({ nullable: true })
  trusted!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
