import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('discuss_call_history', { schema: 'public' })
export class DiscussCallHistory {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  channel_id!: number;

  @Column({ nullable: true })
  start_call_message_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  start_dt!: Date;

  @Column({ nullable: true })
  end_dt!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
