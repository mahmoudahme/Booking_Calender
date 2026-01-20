import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('payment_wizard', { schema: 'public' })
export class PaymentWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  rec_id!: number | null;

  @Column()
  journal_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  payment_type!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  payment_amount!: number | null;

}
