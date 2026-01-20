import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('l10n_sa_edi_otp_wizard', { schema: 'public' })
export class L10nSaEdiOtpWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  l10n_sa_otp!: string | null;

  @Column({ nullable: true })
  l10n_sa_renewal!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
