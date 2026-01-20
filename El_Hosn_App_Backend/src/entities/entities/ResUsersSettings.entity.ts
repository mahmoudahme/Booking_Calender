import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_settings', { schema: 'public' })
export class ResUsersSettings {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  color_scheme!: string;

  @Column({ nullable: true })
  homemenu_config!: any | null;

  @Column({ nullable: true })
  voice_active_duration!: number | null;

  @Column({ nullable: true })
  push_to_talk_key!: string | null;

  @Column({ nullable: true })
  channel_notifications!: string | null;

  @Column({ nullable: true })
  is_discuss_sidebar_category_channel_open!: boolean | null;

  @Column({ nullable: true })
  is_discuss_sidebar_category_chat_open!: boolean | null;

  @Column({ nullable: true })
  use_push_to_talk!: boolean | null;

}
