import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_document_layout', { schema: 'public' })
export class BaseDocumentLayout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  report_layout_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  from_invoice!: boolean | null;

}
