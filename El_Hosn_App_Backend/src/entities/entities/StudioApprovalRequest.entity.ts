import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('studio_approval_request', { schema: 'public' })
export class StudioApprovalRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  mail_activity_id!: number;

  @Column()
  rule_id!: number;

  @Column()
  res_id!: number;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
