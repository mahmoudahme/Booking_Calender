import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ir_rule', { schema: 'public' })
export class IrRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  domain_force!: string | null;

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
  global!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
