import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('digest_digest_res_users_rel', { schema: 'public' })
export class DigestDigestResUsersRel {
  @PrimaryColumn()
  digest_digest_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
