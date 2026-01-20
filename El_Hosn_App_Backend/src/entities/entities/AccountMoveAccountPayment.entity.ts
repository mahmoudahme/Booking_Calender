import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_move__account_payment', { schema: 'public' })
export class AccountMoveAccountPayment {
  @PrimaryColumn()
  invoice_id!: number;

  @PrimaryColumn()
  payment_id!: number;

}
