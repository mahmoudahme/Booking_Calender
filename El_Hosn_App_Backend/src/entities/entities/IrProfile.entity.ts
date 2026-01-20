import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_profile', { schema: 'public' })
export class IrProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sql_count!: number | null;

  @Column({ nullable: true })
  entry_count!: number | null;

  @Column({ nullable: true })
  session!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  init_stack_trace!: string | null;

  @Column({ nullable: true })
  sql!: string | null;

  @Column({ nullable: true })
  traces_async!: string | null;

  @Column({ nullable: true })
  traces_sync!: string | null;

  @Column({ nullable: true })
  others!: string | null;

  @Column({ nullable: true })
  qweb!: string | null;

  @Column({ nullable: true })
  duration!: number | null;

  @Column({ nullable: true })
  cpu_duration!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

}
