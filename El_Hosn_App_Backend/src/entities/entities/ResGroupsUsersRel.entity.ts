import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_groups_users_rel', { schema: 'public' })
export class ResGroupsUsersRel {
  @PrimaryColumn()
  gid!: number;

  @PrimaryColumn()
  uid!: number;

}
