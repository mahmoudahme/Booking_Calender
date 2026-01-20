import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_ui_view_custom', { schema: 'public' })
export class IrUiViewCustom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  ref_id!: number;

  @Column()
  user_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  arch!: string;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
