import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee_cv_wizard', { schema: 'public' })
export class HrEmployeeCvWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  color_primary!: string;

  @Column()
  color_secondary!: string;

  @Column({ nullable: true })
  show_skills!: boolean | null;

  @Column({ nullable: true })
  show_contact!: boolean | null;

  @Column({ nullable: true })
  show_others!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
