import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_change_lock_date', { schema: 'public' })
export class AccountChangeLockDate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  exception_applies_to!: string;

  @Column()
  exception_duration!: string;

  @Column({ nullable: true })
  exception_reason!: string | null;

  @Column({ nullable: true })
  fiscalyear_lock_date!: Date | null;

  @Column({ nullable: true })
  tax_lock_date!: Date | null;

  @Column({ nullable: true })
  sale_lock_date!: Date | null;

  @Column({ nullable: true })
  purchase_lock_date!: Date | null;

  @Column({ nullable: true })
  hard_lock_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
