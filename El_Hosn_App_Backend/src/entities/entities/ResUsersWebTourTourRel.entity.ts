import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_web_tour_tour_rel', { schema: 'public' })
export class ResUsersWebTourTourRel {
  @PrimaryColumn()
  web_tour_tour_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
