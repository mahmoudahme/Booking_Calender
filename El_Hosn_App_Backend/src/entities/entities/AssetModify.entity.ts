import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asset_modify', { schema: 'public' })
export class AssetModify {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  asset_id!: number;

  @Column()
  method_number!: number;

  @Column({ nullable: true })
  account_asset_id!: number | null;

  @Column({ nullable: true })
  account_asset_counterpart_id!: number | null;

  @Column({ nullable: true })
  account_depreciation_id!: number | null;

  @Column({ nullable: true })
  account_depreciation_expense_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  method_period!: string | null;

  @Column({ nullable: true })
  modify_action!: string | null;

  @Column({ nullable: true })
  date!: Date | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  value_residual!: number | null;

  @Column({ nullable: true })
  salvage_value!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
