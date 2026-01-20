import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_account_tag_account_move_line_rel', { schema: 'public' })
export class AccountAccountTagAccountMoveLineRel {
  @PrimaryColumn()
  account_move_line_id!: number;

  @PrimaryColumn()
  account_account_tag_id!: number;

}
