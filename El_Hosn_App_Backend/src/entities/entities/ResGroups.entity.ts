import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('res_groups', { schema: 'public' })
export class ResGroups {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'jsonb' })
  name!: any;

  @Column({ nullable: true })
  sequence!: number | null;

  @Column({ nullable: true })
  privilege_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ type: 'jsonb', nullable: true })
  comment!: any | null;

  @Column({ nullable: true })
  share!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

  @Column({ nullable: true })
  api_key_duration!: number | null;

}
