import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_data', { schema: 'public' })
export class IrModelData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true, default: () => "(now() AT TIME ZONE 'UTC'::text)" })
  create_date!: Date | null;

  @Column({ nullable: true, default: () => "(now() AT TIME ZONE 'UTC'::text)" })
  write_date!: Date | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true, default: () => "false" })
  noupdate!: boolean | null;

  @Column()
  name!: string;

  @Column()
  module!: string;

  @Column()
  model!: string;

  @Column({ nullable: true })
  studio!: boolean | null;

}
