import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_demo_failure', { schema: 'public' })
export class IrDemoFailure {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  module_id!: number;

  @Column({ nullable: true })
  wizard_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  error!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
