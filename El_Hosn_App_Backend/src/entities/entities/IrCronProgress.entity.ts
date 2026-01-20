import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_cron_progress', { schema: 'public' })
export class IrCronProgress {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  cron_id!: number;

  @Column({ nullable: true })
  remaining!: number | null;

  @Column({ nullable: true })
  done!: number | null;

  @Column({ nullable: true })
  timed_out_counter!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  deactivate!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
