import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('certificate_certificate', { schema: 'public' })
export class CertificateCertificate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  private_key_id!: number | null;

  @Column({ nullable: true })
  public_key_id!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  pkcs12_password!: string | null;

  @Column({ nullable: true })
  scope!: string | null;

  @Column({ nullable: true })
  content_format!: string | null;

  @Column({ nullable: true })
  subject_common_name!: string | null;

  @Column({ nullable: true })
  serial_number!: string | null;

  @Column({ nullable: true })
  loading_error!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  date_start!: Date | null;

  @Column({ nullable: true })
  date_end!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
