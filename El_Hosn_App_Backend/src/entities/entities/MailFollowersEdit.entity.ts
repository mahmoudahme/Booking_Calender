import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_followers_edit', { schema: 'public' })
export class MailFollowersEdit {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  res_model!: string;

  @Column({ nullable: true })
  res_ids!: string | null;

  @Column()
  operation!: string;

  @Column({ nullable: true })
  message!: string | null;

  @Column({ nullable: true })
  notify!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
