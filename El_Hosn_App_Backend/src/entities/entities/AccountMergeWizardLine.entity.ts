import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_merge_wizard_line', { schema: 'public' })
export class AccountMergeWizardLine {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  wizard_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  account_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  grouping_key!: string | null;

  @Column()
  display_type!: string;

  @Column({ nullable: true })
  is_selected!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
