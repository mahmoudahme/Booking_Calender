import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_skill_level', { schema: 'public' })
export class HrSkillLevel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  skill_type_id!: number | null;

  @Column({ nullable: true })
  level_progress!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  default_level!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
