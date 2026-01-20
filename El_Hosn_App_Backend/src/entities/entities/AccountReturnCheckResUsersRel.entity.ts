import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_check_res_users_rel', { schema: 'public' })
export class AccountReturnCheckResUsersRel {
  @PrimaryColumn()
  account_return_check_id!: number;

  @PrimaryColumn()
  res_users_id!: number;

}
