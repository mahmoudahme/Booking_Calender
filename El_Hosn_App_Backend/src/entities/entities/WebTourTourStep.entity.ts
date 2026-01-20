import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('web_tour_tour_step', { schema: 'public' })
export class WebTourTourStep {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  tour_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  trigger!: string;

  @Column({ nullable: true })
  content!: string | null;

  @Column({ nullable: true })
  tooltip_position!: string | null;

  @Column({ nullable: true })
  run!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
