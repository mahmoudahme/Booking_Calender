import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_mail_server', { schema: 'public' })
export class IrMailServer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  smtp_port!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  from_filter!: string | null;

  @Column({ nullable: true })
  smtp_host!: string | null;

  @Column()
  smtp_authentication!: string;

  @Column({ nullable: true })
  smtp_user!: string | null;

  @Column({ nullable: true })
  smtp_pass!: string | null;

  @Column()
  smtp_encryption!: string;

  @Column({ nullable: true })
  smtp_debug!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  max_email_size!: number | null;

  @Column({ nullable: true })
  smtp_ssl_certificate!: string | null;

  @Column({ nullable: true })
  smtp_ssl_private_key!: string | null;

  @Column({ nullable: true })
  owner_user_id!: number | null;

  @Column({ nullable: true })
  owner_limit_count!: number | null;

  @Column({ nullable: true })
  owner_limit_time!: Date | null;

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
