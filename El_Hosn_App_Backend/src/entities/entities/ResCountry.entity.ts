import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_country', { schema: 'public' })
export class ResCountry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  address_view_id!: number | null;

  @Column({ nullable: true })
  currency_id!: number | null;

  @Column({ nullable: true })
  phone_code!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ length: 2 })
  code!: string;

  @Column({ nullable: true })
  name_position!: string | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ type: 'jsonb', nullable: true })
  vat_label!: any | null;

  @Column({ nullable: true })
  address_format!: string | null;

  @Column({ nullable: true })
  state_required!: boolean | null;

  @Column({ nullable: true })
  zip_required!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
