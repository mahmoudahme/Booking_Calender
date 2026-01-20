import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_validate_account_move_rel', { schema: 'public' })
export class AccountMoveValidateAccountMoveRel {
  @PrimaryColumn()
  validate_account_move_id!: number;

  @PrimaryColumn()
  account_move_id!: number;

}
