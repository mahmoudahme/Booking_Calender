import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('server_action_history_wizard', { schema: 'public' })
export class ServerActionHistoryWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column()
  revision!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
