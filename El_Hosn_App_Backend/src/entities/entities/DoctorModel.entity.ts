import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ResPartner } from './ResPartner.entity';
import { DoctorSpecialityModel } from './DoctorSpecialityModel.entity';

@Entity('doctor_model', { schema: 'public' })
export class DoctorModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  partner_id!: number;

  @ManyToOne(() => ResPartner)
  @JoinColumn({ name: 'partner_id' })
  partner!: ResPartner;

  @Column({ nullable: true })
  age!: number | null;

  @Column({ nullable: true })
  doctor_degree!: number | null;

  @Column({ nullable: true })
  doctor_speciality!: number | null;

  @ManyToOne(() => DoctorSpecialityModel)
  @JoinColumn({ name: 'doctor_speciality' })
  doctorSpeciality!: DoctorSpecialityModel;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  gender!: string | null;

  @Column({ nullable: true })
  date_of_birth!: Date | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
