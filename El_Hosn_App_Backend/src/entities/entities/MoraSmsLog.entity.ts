import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mora_sms_log', { schema: 'public' })
export class MoraSmsLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  record_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  numbers!: string;

  @Column({ nullable: true })
  sender!: string | null;

  @Column({ nullable: true })
  status!: string | null;

  @Column({ nullable: true })
  error_code!: string | null;

  @Column({ nullable: true })
  error_message!: string | null;

  @Column({ nullable: true })
  model_name!: string | null;

  @Column()
  message!: string;

  @Column({ nullable: true })
  response!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
