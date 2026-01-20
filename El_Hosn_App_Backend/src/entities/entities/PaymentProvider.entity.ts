import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_provider', { schema: 'public' })
export class PaymentProvider {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  redirect_form_view_id!: number | null;

  @Column({ nullable: true })
  inline_form_view_id!: number | null;

  @Column({ nullable: true })
  token_inline_form_view_id!: number | null;

  @Column({ nullable: true })
  express_checkout_form_view_id!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  module_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  code!: string;

  @Column()
  state!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  pre_msg!: any | null;

  @Column({ nullable: true })
  pending_msg!: any | null;

  @Column({ nullable: true })
  auth_msg!: any | null;

  @Column({ nullable: true })
  done_msg!: any | null;

  @Column({ nullable: true })
  cancel_msg!: any | null;

  @Column({ nullable: true })
  maximum_amount!: number | null;

  @Column({ nullable: true })
  is_published!: boolean | null;

  @Column({ nullable: true })
  allow_tokenization!: boolean | null;

  @Column({ nullable: true })
  capture_manually!: boolean | null;

  @Column({ nullable: true })
  allow_express_checkout!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  so_reference_type!: string | null;

}
