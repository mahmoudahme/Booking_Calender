import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move_deferred_rel', { schema: 'public' })
export class AccountMoveDeferredRel {
  @PrimaryColumn()
  original_move_id!: number;

  @PrimaryColumn()
  deferred_move_id!: number;

}
