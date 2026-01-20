import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studio_approval_entry', { schema: 'public' })
export class StudioApprovalEntry {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  user_id!: number;

  @Column()
  rule_id!: number;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  method!: string | null;

  @Column({ nullable: true })
  approved!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
