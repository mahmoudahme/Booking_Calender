import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subtime_model', { schema: 'public' })
export class SubtimeModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  slot_time_id!: number | null;

  @Column({ nullable: true })
  doctor_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  subtime!: string | null;

  @Column()
  day!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  branch_id!: number | null;

}
