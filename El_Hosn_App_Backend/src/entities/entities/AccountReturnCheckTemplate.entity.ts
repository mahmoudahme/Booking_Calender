import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_check_template', { schema: 'public' })
export class AccountReturnCheckTemplate {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  return_type!: number;

  @Column({ nullable: true })
  action_id!: number | null;

  @Column({ nullable: true })
  activity_type!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column({ nullable: true })
  code!: string | null;

  @Column()
  cycle!: string;

  @Column()
  type!: string;

  @Column({ nullable: true })
  additional_action_domain!: string | null;

  @Column({ nullable: true })
  additional_action_context!: string | null;

  @Column({ nullable: true })
  additional_action_params!: string | null;

  @Column({ nullable: true })
  model!: string | null;

  @Column({ nullable: true })
  domain!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  description!: any | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
