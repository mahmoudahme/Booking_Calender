import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_departure_reason', { schema: 'public' })
export class HrDepartureReason {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  country_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
