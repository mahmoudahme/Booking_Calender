import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_currency_rel', { schema: 'public' })
export class PaymentCurrencyRel {
  @PrimaryColumn()
  payment_provider_id!: number;

  @PrimaryColumn()
  currency_id!: number;

}
