import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('barcode_rule', { schema: 'public' })
export class BarcodeRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  barcode_nomenclature_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  encoding!: string;

  @Column()
  type!: string;

  @Column()
  pattern!: string;

  @Column()
  alias!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  associated_uom_id!: number | null;

  @Column({ nullable: true })
  gs1_content_type!: string | null;

  @Column({ nullable: true })
  gs1_decimal_usage!: boolean | null;

}
