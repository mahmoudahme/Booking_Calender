import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_currency', { schema: 'public' })
export class ResCurrency {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  symbol!: string;

  @Column({ nullable: true })
  iso_numeric!: number | null;

  @Column({ nullable: true })
  decimal_places!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  full_name!: string | null;

  @Column({ nullable: true })
  position!: string | null;

  @Column({ nullable: true })
  currency_unit_label!: any | null;

  @Column({ nullable: true })
  currency_subunit_label!: any | null;

  @Column({ nullable: true })
  rounding!: number | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
