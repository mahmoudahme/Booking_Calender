import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_job', { schema: 'public' })
export class HrJob {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  no_of_recruitment!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  department_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  contract_type_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  requirements!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
