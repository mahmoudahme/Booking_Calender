import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_plan', { schema: 'public' })
export class MailActivityPlan {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  res_model_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  res_model!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  department_id!: number | null;

}
