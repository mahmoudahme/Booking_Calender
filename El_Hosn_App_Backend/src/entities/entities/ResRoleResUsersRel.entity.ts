import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_role_res_users_rel', { schema: 'public' })
export class ResRoleResUsersRel {
  @PrimaryColumn()
  res_role_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
