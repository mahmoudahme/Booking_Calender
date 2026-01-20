import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_company_users_rel', { schema: 'public' })
export class ResCompanyUsersRel {
  @PrimaryColumn()
  cid!: number;

  @PrimaryColumn()
  user_id!: number;

}
