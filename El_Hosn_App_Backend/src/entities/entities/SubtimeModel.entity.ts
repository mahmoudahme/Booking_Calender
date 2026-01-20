import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { DoctorModel } from './DoctorModel.entity';

@Entity('subtime_model', { schema: 'public' })
export class SubtimeModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  slot_time_id!: number | null;

  @Column({ nullable: true })
  doctor_id!: number | null;

  @ManyToOne(() => DoctorModel)
  @JoinColumn({ name: 'doctor_id' })
  doctor!: DoctorModel;

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

}
