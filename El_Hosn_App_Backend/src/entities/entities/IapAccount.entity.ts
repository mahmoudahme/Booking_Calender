import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('iap_account', { schema: 'public' })
export class IapAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  service_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true, length: 43 })
  account_token!: string | null;

  @Column({ nullable: true })
  balance!: string | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  service_locked!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  warning_threshold!: number | null;

  @Column({ nullable: true })
  sender_name!: string | null;

}
