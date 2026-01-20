import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_partner_merge_automatic_wizard', { schema: 'public' })
export class BasePartnerMergeAutomaticWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  number_group!: number | null;

  @Column({ nullable: true })
  current_line_id!: number | null;

  @Column({ nullable: true })
  dst_partner_id!: number | null;

  @Column({ nullable: true })
  maximum_group!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  state!: string;

  @Column({ nullable: true })
  group_by_email!: boolean | null;

  @Column({ nullable: true })
  group_by_name!: boolean | null;

  @Column({ nullable: true })
  group_by_is_company!: boolean | null;

  @Column({ nullable: true })
  group_by_vat!: boolean | null;

  @Column({ nullable: true })
  group_by_parent_id!: boolean | null;

  @Column({ nullable: true })
  exclude_contact!: boolean | null;

  @Column({ nullable: true })
  exclude_journal_item!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
