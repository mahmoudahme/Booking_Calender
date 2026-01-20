import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fetchmail_server', { schema: 'public' })
export class FetchmailServer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  port!: number | null;

  @Column({ nullable: true })
  object_id!: number | null;

  @Column({ nullable: true })
  priority!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  server!: string | null;

  @Column()
  server_type!: string;

  @Column({ nullable: true })
  user!: string | null;

  @Column({ nullable: true })
  password!: string | null;

  @Column({ nullable: true })
  script!: string | null;

  @Column({ nullable: true })
  error_message!: string | null;

  @Column({ nullable: true })
  configuration!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  is_ssl!: boolean | null;

  @Column({ nullable: true })
  attach!: boolean | null;

  @Column({ nullable: true })
  original!: boolean | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  error_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  google_gmail_access_token_expiration!: number | null;

  @Column({ nullable: true })
  google_gmail_refresh_token!: string | null;

  @Column({ nullable: true })
  google_gmail_access_token!: string | null;

  @Column({ nullable: true })
  microsoft_outlook_access_token_expiration!: number | null;

  @Column({ nullable: true })
  microsoft_outlook_refresh_token!: string | null;

  @Column({ nullable: true })
  microsoft_outlook_access_token!: string | null;

}
