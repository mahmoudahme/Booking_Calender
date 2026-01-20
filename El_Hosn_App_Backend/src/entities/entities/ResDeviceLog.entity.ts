import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_device_log', { schema: 'public' })
export class ResDeviceLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  session_identifier!: string;

  @Column({ nullable: true })
  platform!: string | null;

  @Column({ nullable: true })
  browser!: string | null;

  @Column({ nullable: true })
  ip_address!: string | null;

  @Column({ nullable: true })
  country!: string | null;

  @Column({ nullable: true })
  city!: string | null;

  @Column({ nullable: true })
  device_type!: string | null;

  @Column({ nullable: true })
  revoked!: boolean | null;

  @Column({ nullable: true })
  first_activity!: Date | null;

  @Column({ nullable: true })
  last_activity!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
