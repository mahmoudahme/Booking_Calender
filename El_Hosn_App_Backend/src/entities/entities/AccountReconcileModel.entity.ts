import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_reconcile_model', { schema: 'public' })
export class AccountReconcileModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sequence!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  next_activity_type_id!: number | null;

  @Column({ nullable: true })
  mapped_partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  trigger!: string;

  @Column({ nullable: true })
  match_amount!: string | null;

  @Column({ nullable: true })
  match_label!: string | null;

  @Column({ nullable: true })
  match_label_param!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  can_be_proposed!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  match_amount_min!: number | null;

  @Column({ nullable: true })
  match_amount_max!: number | null;

  @Column({ nullable: true })
  created_automatically!: boolean | null;

}
