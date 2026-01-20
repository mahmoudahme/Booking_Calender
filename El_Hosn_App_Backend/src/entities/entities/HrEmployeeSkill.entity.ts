import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_employee_skill', { schema: 'public' })
export class HrEmployeeSkill {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  skill_id!: number;

  @Column()
  skill_level_id!: number;

  @Column()
  skill_type_id!: number;

  @Column()
  employee_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  valid_from!: Date | null;

  @Column({ nullable: true })
  valid_to!: Date | null;

  @Column({ nullable: true })
  display_warning_message!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
