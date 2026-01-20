import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('account_return_check', { schema: 'public' })
export class AccountReturnCheck {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true })
  template_id!: number | null;

  @Column({ nullable: true })
  records_count!: number | null;

  @Column({ nullable: true })
  records_model!: number | null;

  @Column()
  return_id!: number;

  @Column({ nullable: true })
  supervisor_id!: number | null;

  @Column({ nullable: true })
  create_uid!: number | null;

  @Column({ nullable: true })
  write_uid!: number | null;

  @Column()
  code!: string;

  @Column()
  type!: string;

  @Column()
  state!: string;

  @Column()
  result!: string;

  @Column({ nullable: true })
  return_state!: string | null;

  @Column()
  name!: any;

  @Column({ nullable: true })
  message!: any | null;

  @Column({ nullable: true })
  action!: any | null;

  @Column({ nullable: true })
  refresh_result!: boolean | null;

  @Column({ nullable: true })
  create_date!: Date | null;

  @Column({ nullable: true })
  write_date!: Date | null;

}
