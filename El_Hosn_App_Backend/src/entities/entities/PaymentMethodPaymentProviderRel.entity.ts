import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_method_payment_provider_rel', { schema: 'public' })
export class PaymentMethodPaymentProviderRel {
  @PrimaryColumn()
  payment_method_id!: number;

  @PrimaryColumn()
  payment_provider_id!: number;

}
