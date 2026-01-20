import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('quotation_document', { schema: 'public' })
export class QuotationDocument {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ir_attachment_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  document_type!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  add_by_default!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
