import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_fiscal_position', { schema: 'public' })
export class AccountFiscalPosition {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  country_group_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  zip_from!: string | null;

  @Column({ nullable: true })
  zip_to!: string | null;

  @Column({ nullable: true })
  foreign_vat!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  note!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  auto_apply!: boolean | null;

  @Column({ nullable: true })
  vat_required!: boolean | null;

  @Column({ nullable: true })
  is_domestic!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
