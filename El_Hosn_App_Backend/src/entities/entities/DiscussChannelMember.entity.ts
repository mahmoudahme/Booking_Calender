import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_channel_member', { schema: 'public' })
export class DiscussChannelMember {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  guest_id!: number | null;

  @Column()
  channel_id!: number;

  @Column({ nullable: true })
  fetched_message_id!: number | null;

  @Column({ nullable: true })
  seen_message_id!: number | null;

  @Column()
  new_message_separator!: number;

  @Column({ nullable: true })
  rtc_inviting_session_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  custom_channel_name!: string | null;

  @Column({ nullable: true })
  custom_notifications!: string | null;

  @Column({ nullable: true })
  mute_until_dt!: Date | null;

  @Column({ nullable: true })
  unpin_dt!: Date | null;

  @Column({ nullable: true })
  last_interest_dt!: Date | null;

  @Column({ nullable: true })
  last_seen_dt!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
