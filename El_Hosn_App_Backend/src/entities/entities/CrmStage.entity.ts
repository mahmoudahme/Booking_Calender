import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('crm_stage', { schema: 'public' })
export class CrmStage {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  rotting_threshold_days!: number | null;

  @Column({ nullable: true })
  color!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ nullable: true })
  requirements!: string | null;

  @Column({ nullable: true })
  is_won!: boolean | null;

  @Column({ nullable: true })
  fold!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
