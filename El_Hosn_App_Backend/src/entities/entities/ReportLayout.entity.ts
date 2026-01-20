import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('report_layout', { schema: 'public' })
export class ReportLayout {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  view_id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  image!: string | null;

  @Column({ nullable: true })
  pdf!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
