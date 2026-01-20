import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_cron', { schema: 'public' })
export class IrCron {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ir_actions_server_id!: number;

  @Column()
  user_id!: number;

  @Column()
  interval_number!: number;

  @Column({ nullable: true })
  priority!: number | null;

  @Column({ nullable: true })
  failure_count!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  cron_name!: string | null;

  @Column()
  interval_type!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column()
  nextcall!: Date;

  @Column({ nullable: true })
  lastcall!: Date | null;

  @Column({ nullable: true })
  first_failure_date!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
