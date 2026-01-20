import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_canned_response', { schema: 'public' })
export class MailCannedResponse {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  source!: string;

  @Column()
  substitution!: string;

  @Column({ nullable: true })
  is_shared!: boolean | null;

  @Column({ nullable: true })
  last_used!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
