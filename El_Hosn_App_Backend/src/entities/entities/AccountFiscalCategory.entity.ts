import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_fiscal_category', { schema: 'public' })
export class AccountFiscalCategory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  company_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  code!: string;

  @Column()
  name!: any;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
