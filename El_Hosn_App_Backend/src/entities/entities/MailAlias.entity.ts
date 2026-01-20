import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_alias', { schema: 'public' })
export class MailAlias {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  alias_domain_id!: number | null;

  @Column()
  alias_model_id!: number;

  @Column({ nullable: true })
  alias_force_thread_id!: number | null;

  @Column({ nullable: true })
  alias_parent_model_id!: number | null;

  @Column({ nullable: true })
  alias_parent_thread_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  alias_name!: string | null;

  @Column({ nullable: true })
  alias_full_name!: string | null;

  @Column()
  alias_contact!: string;

  @Column({ nullable: true })
  alias_status!: string | null;

  @Column({ nullable: true })
  alias_bounced_content!: any | null;

  @Column()
  alias_defaults!: string;

  @Column({ nullable: true })
  alias_incoming_local!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
