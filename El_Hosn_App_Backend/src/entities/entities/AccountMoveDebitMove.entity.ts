import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_debit_move', { schema: 'public' })
export class AccountMoveDebitMove {
  @PrimaryColumn()
  debit_id!: number;

  @PrimaryColumn()
  move_id!: number;

}
