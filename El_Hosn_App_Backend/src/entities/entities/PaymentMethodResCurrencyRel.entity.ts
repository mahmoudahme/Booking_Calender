import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_method_res_currency_rel', { schema: 'public' })
export class PaymentMethodResCurrencyRel {
  @PrimaryColumn()
  payment_method_id!: number;

  @PrimaryColumn()
  res_currency_id!: number;

}
