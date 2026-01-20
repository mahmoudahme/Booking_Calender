import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('service_subtask', { schema: 'public' })
export class ServiceSubtask {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  display_order!: number | null;

  @Column()
  service_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  status!: string | null;

  @Column({ nullable: true })
  description!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
