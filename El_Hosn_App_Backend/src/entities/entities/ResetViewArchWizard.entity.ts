import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reset_view_arch_wizard', { schema: 'public' })
export class ResetViewArchWizard {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  view_id!: number | null;

  @Column({ nullable: true })
  compare_view_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  reset_mode!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
