import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('barcode_nomenclature', { schema: 'public' })
export class BarcodeNomenclature {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  upc_ean_conv!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  gs1_separator_fnc1!: string | null;

  @Column({ nullable: true })
  is_gs1_nomenclature!: boolean | null;

}
