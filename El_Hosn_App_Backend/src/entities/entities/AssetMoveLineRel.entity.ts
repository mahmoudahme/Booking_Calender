import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('asset_move_line_rel', { schema: 'public' })
export class AssetMoveLineRel {
  @PrimaryColumn()
  asset_id!: number;

  @PrimaryColumn()
  line_id!: number;

}
