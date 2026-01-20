import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hr_departure_wizard', { schema: 'public' })
export class HrDepartureWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  departure_reason_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  departure_date!: Date;

  @Column({ nullable: true })
  departure_description!: string | null;

  @Column({ nullable: true })
  remove_related_user!: boolean | null;

  @Column({ nullable: true })
  set_date_end!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
