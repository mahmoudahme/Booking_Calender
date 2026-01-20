import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_actions', { schema: 'public' })
export class IrActions {
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

}
