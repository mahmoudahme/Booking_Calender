import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_resequence_wizard', { schema: 'public' })
export class AccountResequenceWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  first_name!: string;

  @Column()
  ordering!: string;

  @Column({ nullable: true })
  first_date!: Date | null;

  @Column({ nullable: true })
  end_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
