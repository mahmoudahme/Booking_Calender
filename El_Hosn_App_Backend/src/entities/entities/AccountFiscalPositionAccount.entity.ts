import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_fiscal_position_account', { schema: 'public' })
export class AccountFiscalPositionAccount {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  position_id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column()
  account_src_id!: number;

  @Column()
  account_dest_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
