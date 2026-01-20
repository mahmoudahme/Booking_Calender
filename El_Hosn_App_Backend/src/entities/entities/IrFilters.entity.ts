import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_filters', { schema: 'public' })
export class IrFilters {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  embedded_action_id!: number | null;

  @Column({ nullable: true })
  embedded_parent_res_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  sort!: string;

  @Column()
  model_id!: string;

  @Column()
  domain!: string;

  @Column()
  context!: string;

  @Column({ nullable: true })
  is_default!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
