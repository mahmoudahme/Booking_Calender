import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('picking_type_favorite_user_rel', { schema: 'public' })
export class PickingTypeFavoriteUserRel {
  @PrimaryColumn()
  picking_type_id!: number;

  @PrimaryColumn()
  user_id!: number;

}
