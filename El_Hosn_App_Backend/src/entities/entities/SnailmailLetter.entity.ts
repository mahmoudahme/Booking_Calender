import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('snailmail_letter', { schema: 'public' })
export class SnailmailLetter {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column()
  res_id!: number;

  @Column()
  partner_id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  report_template!: number | null;

  @Column({ nullable: true })
  attachment_id!: number | null;

  @Column({ nullable: true })
  message_id!: number | null;

  @Column({ nullable: true })
  state_id!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  model!: string;

  @Column()
  state!: string;

  @Column({ nullable: true })
  error_code!: string | null;

  @Column({ nullable: true })
  street!: string | null;

  @Column({ nullable: true })
  street2!: string | null;

  @Column({ nullable: true })
  zip!: string | null;

  @Column({ nullable: true })
  city!: string | null;

  @Column({ nullable: true })
  info_msg!: string | null;

  @Column({ nullable: true })
  color!: boolean | null;

  @Column({ nullable: true })
  cover!: boolean | null;

  @Column({ nullable: true })
  duplex!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
