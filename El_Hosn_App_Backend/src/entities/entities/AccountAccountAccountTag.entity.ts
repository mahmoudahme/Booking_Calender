import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_account_tag', { schema: 'public' })
export class AccountAccountAccountTag {
  @PrimaryColumn()
  account_account_id!: number;

  @PrimaryColumn()
  account_account_tag_id!: number;

}
