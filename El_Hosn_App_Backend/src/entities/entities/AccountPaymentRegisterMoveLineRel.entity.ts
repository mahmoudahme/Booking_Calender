import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_register_move_line_rel', { schema: 'public' })
export class AccountPaymentRegisterMoveLineRel {
  @PrimaryColumn()
  wizard_id!: number;

  @PrimaryColumn()
  line_id!: number;

}
