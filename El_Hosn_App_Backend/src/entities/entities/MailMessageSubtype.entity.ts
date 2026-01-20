import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mail_message_subtype', { schema: 'public' })
export class MailMessageSubtype {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  parent_id!: number | null;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  relation_field!: string | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true })
  internal!: boolean | null;

  @Column({ nullable: true })
  default!: boolean | null;

  @Column({ nullable: true })
  hidden!: boolean | null;

  @Column({ nullable: true })
  track_recipients!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
