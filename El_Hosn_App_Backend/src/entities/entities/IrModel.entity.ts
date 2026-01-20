import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model', { schema: 'public' })
export class IrModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  model!: string;

  @Column()
  order!: string;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  fold_name!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  info!: string | null;

  @Column({ nullable: true })
  abstract!: boolean | null;

  @Column({ nullable: true })
  transient!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  is_mail_thread!: boolean | null;

  @Column({ nullable: true })
  is_mail_activity!: boolean | null;

  @Column({ nullable: true })
  is_mail_blacklist!: boolean | null;

}
