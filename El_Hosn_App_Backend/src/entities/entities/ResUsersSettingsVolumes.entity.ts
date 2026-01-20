import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_users_settings_volumes', { schema: 'public' })
export class ResUsersSettingsVolumes {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_setting_id!: number;

  @Column({ nullable: true })
  partner_id!: number | null;

  @Column({ nullable: true })
  guest_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  volume!: number | null;

}
