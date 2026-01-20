import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sms_template', { schema: 'public' })
export class SmsTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  sidebar_action_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  template_fs!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  name!: any | null;

  @Column()
  body!: any;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
