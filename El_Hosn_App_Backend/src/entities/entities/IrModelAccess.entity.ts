import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_model_access', { schema: 'public' })
export class IrModelAccess {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  group_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  name!: string;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  perm_read!: boolean | null;

  @Column({ nullable: true })
  perm_write!: boolean | null;

  @Column({ nullable: true })
  perm_create!: boolean | null;

  @Column({ nullable: true })
  perm_unlink!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
