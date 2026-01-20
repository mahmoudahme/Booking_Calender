import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_settings_embedded_action', { schema: 'public' })
export class ResUsersSettingsEmbeddedAction {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_setting_id!: number;

  @Column()
  action_id!: number;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  res_model!: string;

  @Column({ nullable: true })
  embedded_actions_order!: string | null;

  @Column({ nullable: true })
  embedded_actions_visibility!: string | null;

  @Column({ nullable: true })
  embedded_visibility!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
