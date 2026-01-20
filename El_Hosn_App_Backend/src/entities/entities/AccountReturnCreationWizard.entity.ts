import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_creation_wizard', { schema: 'public' })
export class AccountReturnCreationWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column()
  return_type_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  category!: string | null;

  @Column()
  date_from!: Date;

  @Column()
  date_to!: Date;

  @Column({ nullable: true })
  regulatory_compliance!: boolean | null;

  @Column({ nullable: true })
  treasury_financing!: boolean | null;

  @Column({ nullable: true })
  purchases!: boolean | null;

  @Column({ nullable: true })
  operating_expenses!: boolean | null;

  @Column({ nullable: true })
  sales!: boolean | null;

  @Column({ nullable: true })
  inventory!: boolean | null;

  @Column({ nullable: true })
  fixed_assets!: boolean | null;

  @Column({ nullable: true })
  payroll!: boolean | null;

  @Column({ nullable: true })
  government!: boolean | null;

  @Column({ nullable: true })
  equity!: boolean | null;

  @Column({ nullable: true })
  other!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
