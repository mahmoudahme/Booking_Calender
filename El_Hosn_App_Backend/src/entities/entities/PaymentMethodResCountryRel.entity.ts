import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_method_res_country_rel', { schema: 'public' })
export class PaymentMethodResCountryRel {
  @PrimaryColumn()
  payment_method_id!: number;

  @PrimaryColumn()
  res_country_id!: number;

}
