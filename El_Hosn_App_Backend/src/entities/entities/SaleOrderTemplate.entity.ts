import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('sale_order_template', { schema: 'public' })
export class SaleOrderTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  mail_template_id!: number | null;

  @Column({ nullable: true })
  number_of_days!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  note!: any | null;

  @Column({ nullable: true })
  journal_id!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  require_signature!: boolean | null;

  @Column({ nullable: true })
  require_payment!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  prepayment_percent!: number | null;

  @Column({ nullable: true })
  spreadsheet_template_id!: number | null;

}
