import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_plan_template', { schema: 'public' })
export class MailActivityPlanTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  plan_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  activity_type_id!: number;

  @Column({ nullable: true })
  delay_count!: number | null;

  @Column({ nullable: true })
  responsible_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  delay_unit!: string;

  @Column()
  delay_from!: string;

  @Column({ nullable: true })
  summary!: string | null;

  @Column()
  responsible_type!: string;

  @Column({ nullable: true })
  note!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
