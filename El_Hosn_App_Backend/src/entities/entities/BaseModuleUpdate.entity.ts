import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('base_module_update', { schema: 'public' })
export class BaseModuleUpdate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  updated!: number | null;

  @Column({ nullable: true })
  added!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  state!: string | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
