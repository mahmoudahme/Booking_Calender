import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_country_rel', { schema: 'public' })
export class PaymentCountryRel {
  @PrimaryColumn()
  payment_id!: number;

  @PrimaryColumn()
  country_id!: number;

}
