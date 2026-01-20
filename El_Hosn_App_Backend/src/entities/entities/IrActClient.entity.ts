import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_act_client', { schema: 'public' })
export class IrActClient {
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

  @Column()
  name!: any;

  @Column({ nullable: true })
  help!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column()
  tag!: string;

  @Column({ nullable: true })
  target!: string | null;

  @Column({ nullable: true })
  res_model!: string | null;

  @Column()
  context!: string;

  @Column({ nullable: true })
  params_store!: string | null;

}
