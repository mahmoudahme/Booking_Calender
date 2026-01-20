import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_guest', { schema: 'public' })
export class MailGuest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  access_token!: string;

  @Column({ nullable: true })
  email!: string | null;

  @Column({ nullable: true })
  lang!: string | null;

  @Column({ nullable: true })
  timezone!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
