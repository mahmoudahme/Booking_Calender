import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital_bed', { schema: 'public' })
export class HospitalBed {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ward_id!: number;

  @Column()
  bed_type_id!: number;

  @Column({ nullable: true })
  current_patient_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  bed_number!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
