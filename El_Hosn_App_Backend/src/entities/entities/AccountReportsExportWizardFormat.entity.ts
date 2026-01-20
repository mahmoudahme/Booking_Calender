import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reports_export_wizard_format', { schema: 'public' })
export class AccountReportsExportWizardFormat {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  export_wizard_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  fun_to_call!: string;

  @Column({ nullable: true })
  fun_param!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
