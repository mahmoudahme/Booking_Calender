import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_ui_view', { schema: 'public' })
export class IrUiView {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  priority!: number;

  @Column({ nullable: true })
  inherit_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  key!: string | null;

  @Column({ nullable: true })
  type!: string | null;

  @Column({ nullable: true })
  arch_fs!: string | null;

  @Column()
  mode!: string;

  @Column({ type: 'jsonb', nullable: true })
  arch_db!: any | null;

  @Column({ nullable: true })
  arch_prev!: string | null;

  @Column({ nullable: true })
  arch_updated!: boolean | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  customize_show!: boolean | null;

}
