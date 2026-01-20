import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_reversal_new_move', { schema: 'public' })
export class AccountMoveReversalNewMove {
  @PrimaryColumn()
  reversal_id!: number;

  @PrimaryColumn()
  new_move_id!: number;

}
