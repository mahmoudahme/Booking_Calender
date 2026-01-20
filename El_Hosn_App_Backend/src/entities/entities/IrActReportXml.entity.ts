import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_report_xml', { schema: 'public' })
export class IrActReportXml {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  binding_model_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type!: string;

  @Column({ nullable: true })
  path!: string | null;

  @Column()
  binding_type!: string;

  @Column({ nullable: true })
  binding_view_types!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  help!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  paperformat_id!: number | null;

  @Column()
  model!: string;

  @Column()
  report_type!: string;

  @Column()
  report_name!: string;

  @Column({ nullable: true })
  report_file!: string | null;

  @Column({ nullable: true })
  attachment!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  print_report_name!: any | null;

  @Column({ nullable: true })
  multi!: boolean | null;

  @Column({ nullable: true })
  attachment_use!: boolean | null;

  @Column({ nullable: true })
  is_invoice_report!: boolean | null;

}
