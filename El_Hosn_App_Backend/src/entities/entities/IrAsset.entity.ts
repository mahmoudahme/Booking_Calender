import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_asset', { schema: 'public' })
export class IrAsset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  sequence!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column()
  bundle!: string;

  @Column({ nullable: true })
  directive!: string | null;

  @Column()
  path!: string;

  @Column({ nullable: true })
  target!: string | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
