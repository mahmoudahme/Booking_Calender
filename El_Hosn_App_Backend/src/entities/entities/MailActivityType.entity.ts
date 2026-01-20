import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_activity_type', { schema: 'public' })
export class MailActivityType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  delay_count!: number | null;

  @Column({ nullable: true })
  triggered_next_type_id!: number | null;

  @Column({ nullable: true })
  default_user_id!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  delay_unit!: string;

  @Column()
  delay_from!: string;

  @Column({ nullable: true })
  icon!: string | null;

  @Column({ nullable: true })
  decoration_type!: string | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column()
  chaining_type!: string;

  @Column({ nullable: true })
  category!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  summary!: any | null;

  @Column({ nullable: true })
  default_note!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
