import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_payroll_structure_type', { schema: 'public' })
export class HrPayrollStructureType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  default_resource_calendar_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
