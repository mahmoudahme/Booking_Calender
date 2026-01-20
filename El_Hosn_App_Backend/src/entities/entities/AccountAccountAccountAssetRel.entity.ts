import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_account_asset_rel', { schema: 'public' })
export class AccountAccountAccountAssetRel {
  @PrimaryColumn()
  account_account_id!: number;

  @PrimaryColumn()
  account_asset_id!: number;

}
