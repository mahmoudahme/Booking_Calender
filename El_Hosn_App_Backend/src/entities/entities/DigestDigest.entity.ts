import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('digest_digest', { schema: 'public' })
export class DigestDigest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  periodicity!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  next_run_date!: Date | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  kpi_res_users_connected!: boolean | null;

  @Column({ nullable: true })
  kpi_mail_message_total!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  kpi_account_total_revenue!: boolean | null;

  @Column({ nullable: true })
  kpi_account_bank_cash!: boolean | null;

  @Column({ nullable: true })
  kpi_all_sale_total!: boolean | null;

}
