import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_tax_repartition_line', { schema: 'public' })
export class AccountTaxRepartitionLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column({ nullable: true })
  tax_id!: number | null;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  repartition_type!: string;

  @Column()
  document_type!: string;

  @Column()
  factor_percent!: number;

  @Column({ nullable: true })
  use_in_tax_closing!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
