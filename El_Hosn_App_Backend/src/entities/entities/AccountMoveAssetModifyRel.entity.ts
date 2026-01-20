import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_asset_modify_rel', { schema: 'public' })
export class AccountMoveAssetModifyRel {
  @PrimaryColumn()
  asset_modify_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
