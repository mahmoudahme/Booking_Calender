import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_lock_exception', { schema: 'public' })
export class AccountLockException {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  reason!: string | null;

  @Column()
  lock_date_field!: string;

  @Column({ nullable: true })
  lock_date!: Date | null;

  @Column({ nullable: true })
  company_lock_date!: Date | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  end_datetime!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
