import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_embedded_actions', { schema: 'public' })
export class IrEmbeddedActions {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column()
  parent_action_id!: number;

  @Column({ nullable: true })
  parent_res_id!: number | null;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  user_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  parent_res_model!: string;

  @Column({ nullable: true })
  python_method!: string | null;

  @Column({ nullable: true })
  default_view_mode!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  context!: string | null;

  @Column({ nullable: true })
  name!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
