import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('digest_tip_res_users_rel', { schema: 'public' })
export class DigestTipResUsersRel {
  @PrimaryColumn()
  digest_tip_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
