import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee_location', { schema: 'public' })
export class HrEmployeeLocation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  work_location_id!: number;

  @Column()
  employee_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
