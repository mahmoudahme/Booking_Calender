import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('team_favorite_user_rel', { schema: 'public' })
export class TeamFavoriteUserRel {
  @PrimaryColumn()
  team_id!: number;

  @PrimaryColumn()
  user_id!: number;

}
