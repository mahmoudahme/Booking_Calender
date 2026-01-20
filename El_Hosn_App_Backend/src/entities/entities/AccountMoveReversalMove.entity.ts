import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_reversal_move', { schema: 'public' })
export class AccountMoveReversalMove {
  @PrimaryColumn()
  reversal_id!: number;

  @PrimaryColumn()
  move_id!: number;

}
