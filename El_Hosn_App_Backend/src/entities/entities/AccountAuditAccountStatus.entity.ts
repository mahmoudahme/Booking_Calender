import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_audit_account_status', { schema: 'public' })
export class AccountAuditAccountStatus {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  audit_id!: number;

  @Column()
  account_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  status!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
