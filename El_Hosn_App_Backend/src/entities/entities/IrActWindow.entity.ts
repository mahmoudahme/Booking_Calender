import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_window', { schema: 'public' })
export class IrActWindow {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  binding_model_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  type!: string;

  @Column({ nullable: true })
  path!: string | null;

  @Column()
  binding_type!: string;

  @Column({ nullable: true })
  binding_view_types!: string | null;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ type: 'jsonb', nullable: true })
  help!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  view_id!: number | null;

  @Column({ nullable: true })
  res_id!: number | null;

  @Column({ nullable: true })
  limit!: number | null;

  @Column({ nullable: true })
  search_view_id!: number | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column()
  context!: string;

  @Column()
  res_model!: string;

  @Column({ nullable: true })
  target!: string | null;

  @Column()
  view_mode!: string;

  @Column({ nullable: true })
  mobile_view_mode!: string | null;

  @Column({ nullable: true })
  usage!: string | null;

  @Column({ nullable: true })
  filter!: boolean | null;

  @Column({ nullable: true })
  cache!: boolean | null;

}
