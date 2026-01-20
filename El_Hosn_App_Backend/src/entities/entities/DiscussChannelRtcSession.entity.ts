import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_channel_rtc_session', { schema: 'public' })
export class DiscussChannelRtcSession {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  channel_member_id!: number;

  @Column({ nullable: true })
  channel_id!: number | null;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  is_screen_sharing_on!: boolean | null;

  @Column({ nullable: true })
  is_camera_on!: boolean | null;

  @Column({ nullable: true })
  is_muted!: boolean | null;

  @Column({ nullable: true })
  is_deaf!: boolean | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

}
