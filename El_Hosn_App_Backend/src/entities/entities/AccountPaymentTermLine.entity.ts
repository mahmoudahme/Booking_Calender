import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_payment_term_line', { schema: 'public' })
export class AccountPaymentTermLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  nb_days!: number | null;

  @Column()
  payment_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  value!: string;

  @Column()
  delay_type!: string;

  @Column({ nullable: true, length: 2 })
  days_next_month!: string | null;

  @Column({ nullable: true })
  value_amount!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
