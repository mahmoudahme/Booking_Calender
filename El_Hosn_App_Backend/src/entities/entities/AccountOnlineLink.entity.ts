import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_online_link', { schema: 'public' })
export class AccountOnlineLink {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  company_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  state!: string;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  client_id!: string | null;

  @Column({ nullable: true })
  refresh_token!: string | null;

  @Column({ nullable: true })
  access_token!: string | null;

  @Column({ nullable: true })
  provider_type!: string | null;

  @Column({ nullable: true })
  renewal_contact_email!: string | null;

  @Column({ nullable: true })
  expiring_synchronization_date!: Date | null;

  @Column({ nullable: true })
  connection_state_details!: any | null;

  @Column({ nullable: true })
  auto_sync!: boolean | null;

  @Column({ nullable: true })
  has_unlinked_accounts!: boolean | null;

  @Column({ nullable: true })
  last_refresh!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
