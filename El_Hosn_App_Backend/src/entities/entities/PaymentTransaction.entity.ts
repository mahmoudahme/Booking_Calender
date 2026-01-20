import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_transaction', { schema: 'public' })
export class PaymentTransaction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  provider_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  payment_method_id!: number;

  @Column()
  currency_id!: number;

  @Column({ nullable: true })
  token_id!: number | null;

  @Column({ nullable: true })
  source_transaction_id!: number | null;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  partner_state_id!: number | null;

  @Column({ nullable: true })
  partner_country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  reference!: string;

  @Column({ nullable: true })
  provider_reference!: string | null;

  @Column()
  state!: string;

  @Column({ nullable: true })
  operation!: string | null;

  @Column({ nullable: true })
  landing_route!: string | null;

  @Column({ nullable: true })
  partner_name!: string | null;

  @Column({ nullable: true })
  partner_lang!: string | null;

  @Column({ nullable: true })
  partner_email!: string | null;

  @Column({ nullable: true })
  partner_address!: string | null;

  @Column({ nullable: true })
  partner_zip!: string | null;

  @Column({ nullable: true })
  partner_city!: string | null;

  @Column({ nullable: true })
  partner_phone!: string | null;

  @Column({ nullable: true })
  state_message!: string | null;

  @Column()
  amount!: number;

  @Column({ nullable: true })
  is_live!: boolean | null;

  @Column({ nullable: true })
  is_post_processed!: boolean | null;

  @Column({ nullable: true })
  tokenize!: boolean | null;

  @Column({ nullable: true })
  last_state_change!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  payment_id!: number | null;

}
