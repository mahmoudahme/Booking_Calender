import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hospital_ward', { schema: 'public' })
export class HospitalWard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  total_beds!: number | null;

  @Column({ nullable: true })
  occupied_beds!: number | null;

  @Column({ nullable: true })
  available_beds!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  code!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
