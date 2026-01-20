import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studio_approval_rule', { schema: 'public' })
export class StudioApprovalRule {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  model_id!: number;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  approval_group_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  method!: string | null;

  @Column({ nullable: true })
  name!: string | null;

  @Column({ nullable: true })
  notification_order!: string | null;

  @Column({ nullable: true })
  model_name!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column({ nullable: true })
  message!: any | null;

  @Column({ nullable: true })
  active!: boolean | null;

  @Column({ nullable: true })
  exclusive_user!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
