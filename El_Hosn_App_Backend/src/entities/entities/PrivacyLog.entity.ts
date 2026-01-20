import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('privacy_log', { schema: 'public' })
export class PrivacyLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  anonymized_name!: string;

  @Column()
  anonymized_email!: string;

  @Column({ nullable: true })
  execution_details!: string | null;

  @Column({ nullable: true })
  records_description!: string | null;

  @Column({ nullable: true })
  additional_note!: string | null;

  @Column()
  date!: Date;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
