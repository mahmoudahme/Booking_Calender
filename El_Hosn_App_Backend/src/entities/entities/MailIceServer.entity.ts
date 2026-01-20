import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_ice_server', { schema: 'public' })
export class MailIceServer {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  server_type!: string;

  @Column()
  uri!: string;

  @Column({ nullable: true })
  username!: string | null;

  @Column({ nullable: true })
  credential!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
