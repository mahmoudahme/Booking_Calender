import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_channel', { schema: 'public' })
export class DiscussChannel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_channel_id!: number | null;

  @Column({ nullable: true })
  from_message_id!: number | null;

  @Column({ nullable: true })
  group_public_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  channel_type!: string;

  @Column({ nullable: true })
  default_display_mode!: string | null;

  @Column({ nullable: true })
  sfu_channel_uuid!: string | null;

  @Column({ nullable: true })
  sfu_server_url!: string | null;

  @Column({ nullable: true, length: 50 })
  uuid!: string | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  last_interest_dt!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
