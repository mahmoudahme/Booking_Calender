import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital_bed_type_hospital_ward_rel', { schema: 'public' })
export class HospitalBedTypeHospitalWardRel {
  @PrimaryColumn()
  hospital_ward_id!: number;

  @PrimaryColumn()
  hospital_bed_type_id!: number;

}
