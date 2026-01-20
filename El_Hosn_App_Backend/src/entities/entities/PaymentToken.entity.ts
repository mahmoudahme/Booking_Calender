import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_token', { schema: 'public' })
export class PaymentToken {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  provider_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  payment_method_id!: number;

  @Column()
  partner_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  payment_details!: string | null;

  @Column()
  provider_ref!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
