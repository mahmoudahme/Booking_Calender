import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iap_account_res_users_rel', { schema: 'public' })
export class IapAccountResUsersRel {
  @PrimaryColumn()
  iap_account_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
