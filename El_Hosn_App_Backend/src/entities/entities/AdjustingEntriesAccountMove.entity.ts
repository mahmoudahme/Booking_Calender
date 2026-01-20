import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adjusting_entries__account_move', { schema: 'public' })
export class AdjustingEntriesAccountMove {
  @PrimaryColumn()
  move_id!: number;

  @PrimaryColumn()
  adjusting_entry_move_id!: number;

}
